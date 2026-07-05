import { useState } from "react";
import api from "../../api/api";

export default function ProductForm({ refresh }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [shopeeLink, setShopeeLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");

  const removeImage = (index) => {
    setImages(prev =>
        prev.filter((_, i) => i !== index)
    );
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !coverImage) {
      return alert("Semua field wajib diisi");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("shopeeLink", shopeeLink);
    formData.append("tiktokLink", tiktokLink);
    formData.append("coverImage", coverImage);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Produk berhasil ditambahkan");

      // reset form
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setShopeeLink("");
      setTiktokLink("");
      setCoverImage(null);
      setImages([]);

      // refresh product list
      refresh();
    } catch (err) {
      console.log(err);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-md">
      <h2 className="text-2xl font-bold text-[#5a2e0f]">Tambah Produk</h2>

      {/* NAMA */}
      <input type="text" placeholder="Nama Produk" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-xl" required />

      {/* HARGA */}
      <input type="number" placeholder="Harga Produk" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-3 rounded-xl" required />

      {/* CATEGORY */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-xl bg-white" required>
        <option value="">Pilih Kategori</option>
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
        <option value="Outer">Outer</option>
        <option value="Dress">Dress</option>
      </select>

      {/* DESCRIPTION */}
      <textarea placeholder="Deskripsi Produk" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded-xl h-28 resize-none" />

      {/* MARKETPLACE */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#5a2e0f]">Link Marketplace</h3>

        <input type="url" placeholder="Link Shopee (opsional)" value={shopeeLink} onChange={(e) => setShopeeLink(e.target.value)} className="border p-3 rounded-xl w-full" />

        <input type="url" placeholder="Link TikTok Shop (opsional)" value={tiktokLink} onChange={(e) => setTiktokLink(e.target.value)} className="border p-3 rounded-xl w-full" />
      </div>

      {/* IMAGE */}
      <div>
        <p className="mb-2 font-medium">Cover Produk</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setCoverImage(e.target.files[0]);
            }
          }}
          className="border p-2 rounded-xl w-full"
          required
        />
      </div>

      {/* PREVIEW COVER */}
      {coverImage && (
        <div>
          <p className="text-sm mb-2">Preview Cover</p>

          <img src={URL.createObjectURL(coverImage)} alt="" className="w-32 h-32 object-cover rounded-xl border" />
        </div>
      )}

      <div>
        <p className="mb-2 font-medium">Gallery Produk</p>

        <input key={images.length} type="file" accept="image/*" multiple 
          onChange={(e) => {
            const newFiles = Array.from(e.target.files);

            setImages(prev => {
                const merged = [...prev, ...newFiles];

                return merged.filter(
                    (file, index, self) =>
                        index ===
                        self.findIndex(
                            f =>
                                f.name === file.name &&
                                f.size === file.size
                        )
                );
            });

            e.target.value = "";
        }}
      className="border p-2 rounded-xl w-full" />
      </div>

      {/* PREVIEW GALLERY */}
      {images.length > 0 && (
        <div>
          <p className="text-sm mb-2">Preview Gallery</p>

          <div className="flex gap-3 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  className="w-24 h-24 object-cover rounded-xl border"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUTTON */}
      <button type="submit" className="bg-pink1 hover:bg-oren2 text-white py-3 rounded-full font-semibold transition">
        Tambah Produk
      </button>
    </form>
  );
}
