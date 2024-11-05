import { GetServerSideProps } from "next";
import { initializeApollo } from "../lib/apolloClient";
import { GET_PRODUCTS } from "@/graphql/products";
import { Product } from "@/types/product";
import Link from "next/link";
import NewProdcut from "@/components/newProduct/NewProduct";
import ListProduct from "@/components/listProduct/ListProduct";

function HomePage(products: { products: Product[] }) {
  const items = products ?? [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
        <div className="flex justify-center mb-6">
          <NewProdcut />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.products?.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <ListProduct product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      products: data?.products,
    },
  };
};

export default HomePage;
