const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    imageUrl: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    imageUrl: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    authenticate: User
  }

  # type Category {
  #   _id: ID!
  #   name: String!
  #   createdAt: String!
  #   updatedAt: String!
  # }

  # type Order {
  #   _id: ID!
  #   purchaseDate: String!
  #   products: [Product!]!
  #   createdAt: String!
  #   updatedAt: String!
  # }

  # type User {
  #   _id: ID!
  #   firstName: String!
  #   lastName: String!
  #   email: String!
  #   password: String!
  #   orders: [Order!]!
  #   createdAt: String!
  #   updatedAt: String!
  # }
  # type Product {
  #   _id: ID!
  #   name: String!
  #   imageUrl: String
  #   description: String
  #   price: Float!
  #   quantity: Int!
  #   category: Category!
  #   createdAt: String!
  #   updatedAt: String!
  # }

  # type Query {
  #   categories: [Category!]!
  #   category(id: ID!): Category
  #   orders: [Order!]!
  #   order(id: ID!): Order
  #   users: [User!]!
  #   user(id: ID!): User
  #   products: [Product!]!
  #   product(id: ID!): Product
  # }

  type Mutation {
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Category!
    createOrder(products: [ID!]!): Order!
    updateOrder(id: ID!, products: [ID!]!): Order!
    deleteOrder(id: ID!): Order!
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User!
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
    ): User!
    deleteUser(id: ID!): User!
    login(email: String!, password: String!): User
    logout: String
    createProduct(
      name: String!
      imageUrl: String
      description: String
      price: Float!
      quantity: Int!
      category: ID!
    ): Product!
    updateProduct(
      id: ID!
      name: String
      imageUrl: String
      description: String
      price: Float
      quantity: Int
      category: ID
    ): Product!
    deleteProduct(id: ID!): Product!
  }

`;

module.exports = typeDefs;
