import axios from "axios";

export default function ProductList({ products, refresh }) {
  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Produk berhasil dihapus");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-3 rounded shadow flex flex-col items-center">
          <img src={`http://localhost:5000/${product.image}`} alt={product.title} className="w-32 h-32 object-contain mb-2" />
          <h3 className="font-semibold">{product.title}</h3>
          <p>Rp{Number(product.price).toLocaleString("id-ID")}</p>
          <button
            onClick={() => handleDelete(product._id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
