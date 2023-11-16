const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    _id: ID!
    purchaseDate: String!
    products: [Product!]!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    orders: [Order!]!
    createdAt: String!
    updatedAt: String!
  }
  type Product {
    _id: ID!
    name: String!
    imageUrl: String
    description: String
    price: Float!
    quantity: Int!
    category: Category!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    categories: [Category!]!
    category(id: ID!): Category
    orders: [Order!]!
    order(id: ID!): Order
    users: [User!]!
    user(id: ID!): User
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Category!
    createOrder(products: [ID!]!): Order!
    updateOrder(id: ID!, products: [ID!]!): Order!
    deleteOrder(id: ID!): Order!
    createUser(
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
    login(email: String!, password: String!): Auth!
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

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
