import { gql } from "@apollo/client";

export const QUERY_AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
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

export const QUERY_PRODUCT = gql`
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

export const QUERY_USER = gql`
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

export const QUERY_ORDER = gql`
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
