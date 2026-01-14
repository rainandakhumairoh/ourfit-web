import { useState } from "react";
import axios from "axios";

export default function ProductForm({ refresh }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !image) return alert("Semua field harus diisi");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Produk berhasil ditambahkan");
      setName("");
      setPrice("");
      setCategory("");
      setImage(null);
      refresh(); // refresh list produk
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow-sm flex flex-col gap-3 max-w-md">
      <h2 className="font-semibold text-xl">Tambah Produk Baru</h2>
      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Harga Produk"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded"
      />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Tambah Produk
      </button>
    </form>
  );
}
