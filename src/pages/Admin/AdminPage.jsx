import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function AdminPage() {
  const { logout } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null); // product yang diedit
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // Hapus produk
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  // Mulai edit produk
  const startEdit = (product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setEditImage(null);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("price", editPrice);
    if (editImage) formData.append("image", editImage);

    await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditProduct(null);
    setEditName("");
    setEditPrice("");
    setEditImage(null);
    fetchProducts();
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>


      {/* List produk */}
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded">
            <img src={`http://localhost:5000${p.image}`} alt={p.name} className="w-full h-32 object-contain mb-2"/>
            <h3 className="font-semibold">{p.name}</h3>
            <p>Rp{p.price}</p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => startEdit(p)} 
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(p._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit Produk */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                className="border p-2 rounded"
              />
              <input 
                type="number" 
                value={editPrice} 
                onChange={(e) => setEditPrice(e.target.value)} 
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input 
                type="file" 
                onChange={(e) => setEditImage(e.target.files[0])} 
              />
              <div className="flex justify-between mt-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setEditProduct(null)} type="button" className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
