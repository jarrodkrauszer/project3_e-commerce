const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const { createToken } = require('../auth');

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
        context.res.cookie('token', token, {
          maxAge: 60 * 60 * 1000,     // 1 hour
          httpOnly: true,
          secure: process.env.PORT ? true : false
        });

        return user;

      } catch (err) {
        let message;

        if (err.code === 11000) {
          message = 'That email address is already in use.'
        } else {
          message = err.message;
        }

        throw new Error(message);

      }
    },
    createOrder: async (_, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

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
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email }).populate('orders');

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.validatePass(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = createToken(user._id);

      context.res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })

      return user
    },

    logout(_, __, context) {
      context.res.clearCookie('token');

      return 'User logged out successfully!'
    }
  },
};

module.exports = resolvers;

