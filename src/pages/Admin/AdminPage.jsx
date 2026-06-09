// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { UserContext } from "../../context/UserContext";

// import ProductForm from "./ProductForm";
// import ProductList from "./ProductList";
// import MixMatchForm from "./MixMatchForm";
// import MixMatchList from "./MixMatchList";

// export default function AdminPage() {
//   const { logout } = useContext(UserContext);
//   const [products, setProducts] = useState([]);
//   const [mixmatch, setMixmatch] = useState([]);

//   // fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/products"
//       );

//       setProducts(res.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // FETCH MIXMATCH
//   const fetchMixmatch = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/mixmatch"
//       );

//       setMixmatch(res.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchMixmatch();
//   }, []);

//   return (
//     <div className="min-h-screen bg-primary p-10 pt-10">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-4xl font-bold text-black">
//           Admin Dashboard
//         </h1>

//         <button
//           onClick={logout}
//           className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
//         >
//           Logout
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* FORM */}
//         <div>
//           <ProductForm refresh={fetchProducts} />
//         </div>

//         {/* PRODUCT LIST */}
//         <div className="lg:col-span-2">
//           <ProductList
//             products={products}
//             refresh={fetchProducts}
//           />
//         </div>

//         {/* FORM */}
//         <div>
//           <MixMatchForm refresh={fetchMixmatch} />
//         </div>

//         {/* MIXMATCH LIST */}
//         <div className="lg:col-span-2">
//           <MixMatchList
//             mixmatch={mixmatch}
//             refresh={fetchMixmatch}
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import MixMatchForm from "./MixMatchForm";
import MixMatchList from "./MixMatchList";

export default function AdminPage() {
  const { logout } = useContext(UserContext);

  const [activeMenu, setActiveMenu] = useState("products");

  const [products, setProducts] = useState([]);
  const [mixmatch, setMixmatch] = useState([]);

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
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 h-screen bg-white shadow-lg flex flex-col shrink-0">

        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            OURFIT ADMIN
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <button
            onClick={() => setActiveMenu("products")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeMenu === "products"
                ? "bg-pink1 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveMenu("mixmatch")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeMenu === "mixmatch"
                ? "bg-pink1 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Mix & Match
          </button>

          <button
            onClick={() => setActiveMenu("users")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeMenu === "users"
                ? "bg-pink1 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Users
          </button>

          <button
            onClick={() => setActiveMenu("settings")}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeMenu === "settings"
                ? "bg-pink1 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Settings
          </button>

        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full bg-pink1 text-white py-3 rounded-lg hover:bg-oren2 font-semibold"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* CONTENT */}
      <main className="flex-1 h-screen overflow-hidden p-8">

        <h2 className="text-3xl font-bold mb-8 capitalize">
          {activeMenu}
        </h2>

        {activeMenu === "products" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-120px)]">

          <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
            <ProductForm refresh={fetchProducts} />
          </div>

            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <ProductList
                products={products}
                refresh={fetchProducts}
              />
            </div>

          </div>
        )}

        {activeMenu === "mixmatch" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-120px)]">

            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <MixMatchForm refresh={fetchMixmatch} />
            </div>

          <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
            <MixMatchList
              mixmatch={mixmatch}
              refresh={fetchMixmatch}
            />
          </div>

          </div>
        )}

        {activeMenu === "users" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">
              User Management
            </h3>
            <p className="text-gray-500 mt-2">
              Daftar pengguna akan ditampilkan di sini.
            </p>
          </div>
        )}

        {activeMenu === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">
              Website Settings
            </h3>
            <p className="text-gray-500 mt-2">
              Pengaturan website akan ditampilkan di sini.
            </p>
          </div>
        )}

      </main>

    </div>
  );
}