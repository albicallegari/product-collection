import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_PRODUCT_DETAIL } from "../../graphql/products";
import { MdOutlineDelete } from "react-icons/md";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_PRODUCT_DETAIL, {
    variables: { id },
    skip: !id, // Avoid execution till `id` isn't available
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => router.push("/"),
    onError: (error) => {
      console.error("Error occurred:", error.message);
    },
  });

  const handleDeleteProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteProduct({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {data?.product.name}
        </h1>
        <p className="text-gray-700 mb-4">{data?.product.description}</p>
        <p className="text-lg font-semibold text-gray-900 mb-6">
          Price: ${data?.product.price}
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg shadow transition"
          >
            Back to List
          </button>
          <button
            onClick={(e) => handleDeleteProduct(e)}
            className="p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            title="Delete Product"
          >
            <MdOutlineDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
