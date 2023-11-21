const { User, Product, Category, Order } = require("../models");
const { AuthenticationError } = require("../auth/authError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createToken } = require("../auth");

const resolvers = {
  Query: {
    authenticate(_, __, context) {
      return context.user;
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    checkout: async (parent, args, context) => {
      const url = context.req.headers.origin;

      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.imageUrl],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    orderHistory: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You must be logged in to view your order history."
        );
      }
      // Fetch and return the order history for the user
      const orderHistory = await Order.find({ userId: user.id });
      return orderHistory;
    },

    product: async (_, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    user: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (_, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    async register(_, args, context) {
      try {
        const user = await User.create(args);

        const token = await createToken(user._id);

        // Authenticate/Log In User
        context.res.cookie("token", token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          secure: process.env.PORT ? true : false,
        });

        return user;
      } catch (err) {
        let message;

        if (err.code === 11000) {
          message = "That email address is already in use.";
        } else {
          message = err.message;
        }

        throw new Error(message);
      }
    },
    addOrder: async (_, { products }, context) => {
      if (context.user) {
        const order = new Order({ products: products.map(p => p.id) });

        for (let product of products) {
          await Product.findOneAndUpdate({ _id: product.id }, {
            $inc: {
              quantity: -product.purchaseQuantity
            }
          })
        }

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (_, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email }).populate("orders");

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.validatePass(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = await createToken(user._id);

      context.res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      return user;
    },

    logout(_, __, context) {
      context.res.clearCookie("token");

      return "User logged out successfully!";
    },
  },
};

module.exports = resolvers;
