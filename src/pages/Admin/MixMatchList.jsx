import { useState, useEffect } from "react";
import axios from "axios";
import { X, Plus } from "lucide-react";

const STYLE_CATEGORIES = ["Casual", "Formal", "Feminine", "Elegan", "Streetwear", "Bohemian", "Minimalist"];

export default function MixMatchList({ mixmatch, refresh }) {
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editSelectedProducts, setEditSelectedProducts] = useState([]);

  // Untuk search produk di modal edit
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch semua produk untuk keperluan edit
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !editSelectedProducts.find((s) => s._id === p._id)
  );

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus Mix & Match ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/mixmatch/${id}`);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // START EDIT
  const startEdit = (item) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category || "");
    setEditDescription(item.description || "");
    setEditImage(null);
    setEditSelectedProducts(item.products || []);
    setSearchQuery("");
  };

  // SUBMIT EDIT
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editTitle || !editCategory || editSelectedProducts.length === 0) {
      return alert("Judul, kategori, dan minimal 1 produk wajib diisi");
    }

    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("category", editCategory);
      formData.append("description", editDescription);
      if (editImage) formData.append("image", editImage);
      editSelectedProducts.forEach((p) => formData.append("products", p._id));

      await axios.put(
        `http://localhost:5000/api/mixmatch/${editItem._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditItem(null);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan");
    }
  };

  const handleSelectProduct = (product) => {
    setEditSelectedProducts((prev) => [...prev, product]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleRemoveProduct = (id) => {
    setEditSelectedProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <>
      {/* GRID LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mixmatch.map((item) => (
          <div key={item._id} className="bg-white rounded-3xl shadow-md overflow-hidden">

            {/* FOTO */}
            <div className="w-full h-64 bg-[#fff7ed] flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#c9a07a] text-sm">Tidak ada foto</span>
              )}
            </div>

            <div className="p-5">

              {/* CATEGORY BADGE */}
              {item.category && (
                <span className="inline-block px-3 py-1 bg-[#f4cda3] text-[#5a2e0f] text-xs font-semibold rounded-full mb-2">
                  {item.category}
                </span>
              )}

              {/* TITLE */}
              <h3 className="text-xl font-bold text-[#5a2e0f]">{item.title}</h3>

              {/* DESCRIPTION */}
              {item.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              )}

              {/* PRODUK REKOMENDASI */}
              {item.products?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                    Rekomendasi Produk ({item.products.length})
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {item.products.map((product) => (
                      <div
                        key={product._id}
                        className="w-14 h-14 rounded-xl overflow-hidden border border-[#f4cda3]"
                      >
                        {product.coverImage ? (
                          <img
                            src={`http://localhost:5000${product.coverImage}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            title={product.name}
                          />
                        ) : (
                          <div className="w-full h-full bg-[#fff7ed] flex items-center justify-center">
                            <span className="text-[8px] text-[#c9a07a] text-center px-1">{product.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => startEdit(item)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#5a2e0f]">Edit Mix & Match</h2>
              <button
                onClick={() => setEditItem(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">

              {/* JUDUL */}
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Judul Mix & Match"
                className="border p-3 rounded-xl"
                required
              />

              {/* KATEGORI */}
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="border p-3 rounded-xl bg-white"
                required
              >
                <option value="">Pilih Kategori Style</option>
                {STYLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* DESKRIPSI */}
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Deskripsi (opsional)"
                className="border p-3 rounded-xl h-24 resize-none"
              />

              {/* FOTO */}
              <div>
                <p className="font-medium mb-2">Foto Mix & Match</p>

                {/* Preview foto saat ini */}
                {editItem.image && !editImage && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">Foto saat ini:</p>
                    <img
                      src={`http://localhost:5000${editItem.image}`}
                      alt=""
                      className="w-32 h-32 object-cover rounded-2xl border border-[#f4cda3]"
                    />
                  </div>
                )}

                {/* Preview foto baru */}
                {editImage && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">Foto baru:</p>
                    <img
                      src={URL.createObjectURL(editImage)}
                      alt=""
                      className="w-32 h-32 object-cover rounded-2xl border border-[#f4cda3]"
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="border p-2 rounded-xl w-full"
                />
                <p className="text-xs text-gray-400 mt-1">Kosongkan jika tidak ingin mengganti foto</p>
              </div>

              {/* REKOMENDASI PRODUK */}
              <div>
                <p className="font-medium mb-2">Rekomendasi Produk</p>

                {/* Search */}
                <div className="relative">
                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <input
                      type="text"
                      placeholder="Cari dan tambah produk..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="flex-1 p-3 outline-none"
                    />
                    <span className="px-3 text-[#804000]">
                      <Plus size={18} />
                    </span>
                  </div>

                  {/* Dropdown */}
                  {showDropdown && searchQuery && filteredProducts.length > 0 && (
                    <div className="absolute z-20 w-full bg-white border border-[#f4cda3] rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <button
                          key={product._id}
                          type="button"
                          onClick={() => handleSelectProduct(product)}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#fff7ed] transition text-left"
                        >
                          {product.coverImage && (
                            <img
                              src={`http://localhost:5000${product.coverImage}`}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg border border-[#f4cda3]"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-[#5a2e0f]">{product.name}</p>
                            <p className="text-xs text-gray-400">{product.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {showDropdown && (
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  )}
                </div>

                {/* Daftar produk terpilih */}
                {editSelectedProducts.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {editSelectedProducts.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-3 bg-[#fff7ed] border border-[#f4cda3] rounded-xl px-3 py-2"
                      >
                        {product.coverImage && (
                          <img
                            src={`http://localhost:5000${product.coverImage}`}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg border border-[#f4cda3]"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#5a2e0f]">{product.name}</p>
                          <p className="text-xs text-gray-400">
                            Rp{Number(product.price).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(product._id)}
                          className="text-[#d17261] hover:bg-[#d17261]/10 p-1 rounded-full transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {editSelectedProducts.length === 0 && (
                  <p className="text-xs text-gray-400 mt-2">Belum ada produk dipilih. Minimal 1 produk.</p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-full font-semibold transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}