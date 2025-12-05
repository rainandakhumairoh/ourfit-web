import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import axios from "axios";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const { logout } = useContext(UserContext);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <ProductForm refresh={fetchProducts} />
      <ProductList products={products} refresh={fetchProducts} />
    </div>
  );
}
