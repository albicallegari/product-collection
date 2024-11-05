import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_PRODUCT } from "../../graphql/products";

export default function NewProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("0");

  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => router.push("/"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ variables: { name, description, price: parseFloat(price)} });
  };

  const handlePriceChange = (e: any) => {
    let value = e.target.value;

    // Remove letters and not numeric symbols 
    value = value.replace(/[^0-9.,]/g, '');

    // Swap coma with dot to format
    value = value.replace(/,/g, '.');

    // just one decimal dot
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
      return; // do not update if there is more than one decimal dot
    }

    setPrice(value);
  };

  const handleBlur = () => {
    if (price) {
      setPrice(parseFloat(price).toFixed(2));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            onBlur={handleBlur}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
          {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        </form>
        <button
          onClick={() => router.back()}
          className="mt-4 w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
