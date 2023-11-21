import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
      orders {
        _id
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($products: [ID!]!) {
    createOrder(products: $products) {
      _id
      products
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($_id: ID!, $quantity: Int!) {
    updateProduct(_id: $_id, quantity: $quantity) {
      _id
      quantity
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      orders {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [PurchaseOrder]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
