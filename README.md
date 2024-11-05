

## Getting Started from project root

```bash
cd product-collection
```

### Install Client

- Intall peckages
```bash
cd packages/client
npm install
```

## Install Server

- Intall peckages
```bash
cd packages/server
yarn install
```

## Run Server

```bash
cd product-collection
yarn start-server
```

## Run App Client

- Run development app
```bash
cd product-collection
yarn dev-client
```

- Create build and run app
```bash
cd product-collection
yarn build-client
```

```bash
yarn start-client
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## TEST Description
Build a basic product catalog with API endpoints for CRUD operations. This project will test the candidate’s skills in using Next.js (use the version you like most) API routes, the app directory, and server-side rendering (SSR) with frontend rendering. It requires also the ability to create and manage a simple ApolloJS server to CRUD an entity.

### Requirements

1. Project Setup
- [X] Make sure to create a monorepo with both (server and nextJS) projects inside
- [X] Use the Next.js app directory for routing.
- [X] Use the package manager you prefer
2. Functionality
- [X] Product List Page:
    - [X] Display a list of products fetched from an API route.
    - [X] Use SSR to fetch the initial product list (to test server-side rendering).
    - [X] Allow users to delete products from the list.
- [X] Product Details Page:
    - [X] Display detailed information about a single product.
    - [X] Fetch data via a dynamic route in the API (e.g., /api/products/[id])
- [X] Create Product Page:
    - [X] include a form to add a new product with fields like name, description, and price.
- [X] Submit the form via a Mutation request using the server actions.
- [X] On submission, redirect back to the product list page.
- [X] API Endpoints:
    - [X] Store data in a simple in-memory array (no database required).
3. Tech Requirements
- [X] Use TypeScript.
- [X] Write clean, readable code with comments explaining logic where appropriate. 
4. Submission
- [X] Provide instructions on how to install and run the project.
- [X] Include a README with a brief project overview and descriptions of implemented routes and components.
5. Bonus point: We work with many merge requests, so knowing how to explain your work well means a lot to us.
- [ ] Create a small PR on your repo showing us the structure of your PR
