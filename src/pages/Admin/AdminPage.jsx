import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import MixMatchForm from "./MixMatchForm";
import MixMatchList from "./MixMatchList";

export default function AdminPage() {
  const { logout } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [mixmatch, setMixmatch] = useState([]);

  // fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH MIXMATCH
  const fetchMixmatch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/mixmatch"
      );

      setMixmatch(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMixmatch();
  }, []);

  return (
    <div className="min-h-screen bg-primary p-10 pt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-black">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM */}
        <div>
          <ProductForm refresh={fetchProducts} />
        </div>

        {/* PRODUCT LIST */}
        <div className="lg:col-span-2">
          <ProductList
            products={products}
            refresh={fetchProducts}
          />
        </div>

        {/* FORM */}
        <div>
          <MixMatchForm refresh={fetchMixmatch} />
        </div>

        {/* MIXMATCH LIST */}
        <div className="lg:col-span-2">
          <MixMatchList
            mixmatch={mixmatch}
            refresh={fetchMixmatch}
          />
        </div>

      </div>
    </div>
  );
}