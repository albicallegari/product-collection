import { gql } from "@apollo/client";

// Get all product
export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
    }
  }
`;

// Get product by ID
export const GET_PRODUCT_DETAIL = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`;

// Mutation to add new product
export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $price: Float!) {
    addProduct(name: $name, description: $description, price: $price) {
      id
      name
      description
      price
    }
  }
`;

// Mutation to delete a product
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      price
    }
  }
`;