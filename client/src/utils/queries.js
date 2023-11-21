import { gql } from "@apollo/client";

export const QUERY_AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      _id
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          imageUrl
        }
      }
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

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      imageUrl
      category {
        _id
        name
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      imageUrl
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
      description
      price
      quantity
      imageUrl
      category {
        _id
        name
      }
    }
  }
`;


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          imageUrl
        }
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;
