import { useRef, useState, useEffect } from "react";
import api from "../../api/api";
import { X, Plus } from "lucide-react";

export default function MixMatchForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  // Daftar semua produk dari DB untuk dipilih
  const [allProducts, setAllProducts] = useState([]);
  // Produk yang dipilih sebagai rekomendasi
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch semua produk
  useEffect(() => {
    api
      .get("/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedProducts.find((s) => s._id === p._id));

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !image || selectedProducts.length === 0) {
      return alert("Judul, kategori, foto, dan minimal 1 produk rekomendasi wajib diisi");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    selectedProducts.forEach((p) => formData.append("products", p._id));

    try {
      await api.post("/mixmatch", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Mix & Match berhasil ditambahkan!");

      // Reset form
      setTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
      setSelectedProducts([]);
      setSearchQuery("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan Mix & Match");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-md">
      <h2 className="text-2xl font-bold text-[#5a2e0f]">Tambah Mix & Match</h2>

      {/* JUDUL */}
      <input type="text" placeholder="Judul Mix & Match" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-3 rounded-xl" required />

      {/* KATEGORI STYLE */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-xl bg-white" required>
        <option value="">Pilih Kategori Style</option>
        <option value="Casual">Casual</option>
        <option value="Formal">Formal</option>
        <option value="Feminine">Feminine</option>
        <option value="Elegan">Elegan</option>
        <option value="Streetwear">Streetwear</option>
        <option value="Bohemian">Bohemian</option>
        <option value="Minimalist">Minimalist</option>
      </select>

      {/* DESKRIPSI */}
      <textarea placeholder="Deskripsi (opsional)" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded-xl h-24 resize-none" />

      {/* FOTO MIX & MATCH */}
      <div>
        <p className="mb-2 font-medium">Foto Mix & Match</p>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded-xl w-full"
          required
        />  
        </div>

      {/* PREVIEW FOTO */}
      {image && (
        <div>
          <p className="text-sm mb-2 text-gray-500">Preview</p>

          <div className="relative w-40">
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-40 h-40 object-cover rounded-2xl border border-[#f4cda3]"
            />

            <button
              type="button"
              onClick={() => {
                setImage(null);

                if (imageInputRef.current) {
                  imageInputRef.current.value = "";
                }
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* REKOMENDASI PRODUK */}
      <div>
        <p className="mb-2 font-medium">Rekomendasi Produk</p>

        {/* Search produk */}
        <div className="relative">
          <div className="flex items-center border rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Cari dan pilih produk..."
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

          {/* Dropdown hasil pencarian */}
          {showDropdown && searchQuery && filteredProducts.length > 0 && (
            <div className="absolute z-20 w-full bg-white border border-[#f4cda3] rounded-xl shadow-lg mt-1 max-h-52 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button key={product._id} type="button" onClick={() => handleSelectProduct(product)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#fff7ed] transition text-left">
                  {product.coverImage && <img src={`${product.coverImage}`} alt="" className="w-10 h-10 object-cover rounded-lg border border-[#f4cda3]" />}
                  <div>
                    <p className="text-sm font-medium text-[#5a2e0f]">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Tutup dropdown saat klik luar */}
          {showDropdown && <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />}
        </div>

        {/* Produk yang sudah dipilih */}
        {selectedProducts.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {selectedProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-3 bg-[#fff7ed] border border-[#f4cda3] rounded-xl px-3 py-2">
                {product.coverImage && <img src={`${product.coverImage}`} alt="" className="w-10 h-10 object-cover rounded-lg border border-[#f4cda3]" />}
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a2e0f]">{product.name}</p>
                  <p className="text-xs text-gray-400">Rp{Number(product.price).toLocaleString("id-ID")}</p>
                </div>
                <button type="button" onClick={() => handleRemoveProduct(product._id)} className="text-[#d17261] hover:bg-[#d17261]/10 p-1 rounded-full transition">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedProducts.length === 0 && <p className="text-xs text-gray-400 mt-2">Belum ada produk dipilih. Minimal 1 produk.</p>}
      </div>

      {/* SUBMIT */}
      <button type="submit" className="bg-pink1 hover:bg-oren2 text-white py-3 rounded-full font-semibold transition mt-2">
        Tambah Mix & Match
      </button>
    </form>
  );
}
