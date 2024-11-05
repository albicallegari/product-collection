import Link from "next/link";
import { LuPlus } from "react-icons/lu";

const NewProdcut = () => {
  return (
    <Link href="/products/new">
      <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition flex justify-center items-center gap-2">
        <LuPlus />
        <p>Add New Product</p>
      </button>
    </Link>
  );
};

export default NewProdcut;
