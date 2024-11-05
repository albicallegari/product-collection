import Link from "next/link";
import { ListProductProps } from "./ListProduct.model";
import { MdOutlineDelete } from "react-icons/md";
import { DELETE_PRODUCT } from "@/graphql/products";
import { useMutation } from "@apollo/client";
import router from "next/router";

const ListProduct = ({ product }: ListProductProps) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => router.push("/"),
    onError: (error) => {
      console.error("Error occurred:", error.message);
    },
  });

  const handleDeleteProduct = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    await deleteProduct({ variables: { id } });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">
          Price: ${product.price}
        </p>
      </div>
      <div className="flex gap-4 items-center my-2 mt-5">
        <Link href={`/products/${product.id}`}>
          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg shadow">
            Open detail
          </button>
        </Link>
        <button
          onClick={(e) => handleDeleteProduct(e, product.id)}
          className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition"
          title="Delete Product"
        >
          <MdOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
