import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const PRODUCTS = gql`
  query Products($category: ID, $name: String) {
    products(category: $category, name: $name) {
      _id
      name
      category {
        _id
        name
      }
    }
  }
`;

export const PRODUCT = gql`
  query Product($_id: ID!) {
    product(_id: $_id) {
      _id
      name
      category {
        _id
        name
      }
    }
  }
`;

export const USER = gql`
  query User {
    user {
      _id
      firstName
      lastName
      email
      orders {
        _id
        products {
          _id
          name
          category {
            _id
            name
          }
        }
        purchaseDate
      }
    }
  }
`;

export const ORDER = gql`
  query Order($_id: ID!) {
    order(_id: $_id) {
      _id
      products {
        _id
        name
        category {
          _id
          name
        }
      }
      purchaseDate
    }
  }
`;
