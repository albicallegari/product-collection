import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

// In-memory array
let products = [
  { id: 1, name: 'Eco Bottle', description: 'Reusable eco bottle', price: 12.99 },
  { id: 2, name: 'Smart Watch', description: 'Fitness watch with notifications', price: 59.99 },
  { id: 3, name: 'Bluetooth Speaker', description: 'Portable wireless speaker', price: 25.50 },
  { id: 4, name: 'Travel Backpack', description: 'Comfortable and durable backpack', price: 45.00 },
  { id: 5, name: 'Wireless Earbuds', description: 'Wireless earphones', price: 35.99 },
  { id: 6, name: 'Yoga Mat', description: 'Non-slip yoga mat', price: 19.99 }
];


// Defining types
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String, price: Float!): Product
    deleteProduct(id: ID!): Product
  }
`;

// Setting the revolvers
const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((p) => p.id == id),
  },
  Mutation: {
    addProduct: (_, { name, description, price }) => {
      const newProduct = { id: products.length + 1, name, description, price };
      products.push(newProduct);
      return newProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((p) => p.id == id);
      if (index === -1) return null;
      const [deletedProduct] = products.splice(index, 1);
      return deletedProduct;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

startServer();
