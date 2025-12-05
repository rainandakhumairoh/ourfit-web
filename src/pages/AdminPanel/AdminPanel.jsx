import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/products", 
      { title, price, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Produk berhasil ditambahkan!");
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="block mb-2"/>
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="block mb-2"/>
      <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} className="block mb-2"/>
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
    </div>
  );
}
