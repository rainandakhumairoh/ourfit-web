import { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { UserContext } from "../../context/UserContext";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import MixMatchForm from "./MixMatchForm";
import MixMatchList from "./MixMatchList";

export default function AdminPage() {
  const { logout } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [mixmatch, setMixmatch] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMixmatch = async () => {
    try {
      const res = await api.get("/mixmatch");
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
    <div className="min-h-screen flex bg-gray-100">
      <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-3 rounded-lg shadow">
        <FontAwesomeIcon icon={faBars} />
      </button>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64
          bg-white
          shadow-lg
          flex flex-col
          z-50
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">OURFIT ADMIN</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              setActiveMenu("products");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg ${activeMenu === "products" ? "bg-pink1 text-white" : "hover:bg-gray-100"}`}
          >
            Products
          </button>

          <button
            onClick={() => {
              setActiveMenu("mixmatch");
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg ${activeMenu === "mixmatch" ? "bg-pink1 text-white" : "hover:bg-gray-100"}`}
          >
            Mix & Match
          </button>

          {/* <button
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
          </button> */}
        </nav>

        <div className="p-4 border-t">
          <button onClick={logout} className="w-full bg-pink1 text-white py-3 rounded-lg hover:bg-oren2 font-semibold">
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-4 lg:p-8 lg:ml-0 mt-16 lg:mt-0">
        <h2 className="text-3xl font-bold mb-8 capitalize">{activeMenu}</h2>

        {activeMenu === "products" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-120px)]">
            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <ProductForm refresh={fetchProducts} />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <ProductList products={products} refresh={fetchProducts} />
            </div>
          </div>
        )}

        {activeMenu === "mixmatch" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-120px)]">
            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <MixMatchForm refresh={fetchMixmatch} />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
              <MixMatchList mixmatch={mixmatch} refresh={fetchMixmatch} />
            </div>
          </div>
        )}

        {activeMenu === "users" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">User Management</h3>
            <p className="text-gray-500 mt-2">Daftar pengguna akan ditampilkan di sini.</p>
          </div>
        )}

        {activeMenu === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Website Settings</h3>
            <p className="text-gray-500 mt-2">Pengaturan website akan ditampilkan di sini.</p>
          </div>
        )}
      </main>
    </div>
  );
}
