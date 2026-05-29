import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [thumbStart, setThumbStart] = useState(0);
  const [isWished, setIsWished] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const THUMB_VISIBLE = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.coverImage);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20 text-[#804000]">Memuat produk...</p>;
  }

  const allImages = [product.coverImage, ...(product.images || [])];
  const visibleThumbs = allImages.slice(thumbStart, thumbStart + THUMB_VISIBLE);

  const colors = product.colors || ["Broken white", "Ivory", "Soft pink", "Maroon", "Sage", "Soft blue", "Black"];
  const sizes = product.sizes || ["Petite size", "All size"];

  return (
    <div className="min-h-screen bg-[#fff7ed] px-6 py-10 pt-28">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-8 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50"
      >
        <ArrowLeft size={20} />
      </button>

      {/* MAIN CONTENT - 2 kolom */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

        {/* LEFT — Foto + Thumbnail */}
        <div className="flex flex-col items-center">

          {/* MAIN IMAGE */}
          <div className="w-full bg-white border-2 border-[#f4cda3] rounded-3xl overflow-hidden flex items-center justify-center aspect-square">
            {selectedImage ? (
              <img
                src={`http://localhost:5000${selectedImage}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#c9a07a] text-sm font-medium">FOTO PRODUK</span>
            )}
          </div>

          {/* THUMBNAILS dengan navigasi */}
          <div className="flex items-center gap-2 mt-4 w-full justify-center">
            <button
              onClick={() => setThumbStart((prev) => Math.max(0, prev - 1))}
              disabled={thumbStart === 0}
              className="p-1 rounded-full border border-[#f4cda3] bg-white text-[#804000] disabled:opacity-30 hover:bg-[#f4cda3] transition"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {visibleThumbs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === img
                      ? "border-[#804000]"
                      : "border-[#f4cda3]"
                  }`}
                >
                  {img ? (
                    <img
                      src={`http://localhost:5000${img}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white" />
                  )}
                </button>
              ))}
              {/* Dummy thumbs jika kurang dari 5 */}
              {visibleThumbs.length < THUMB_VISIBLE &&
                Array.from({ length: THUMB_VISIBLE - visibleThumbs.length }).map((_, i) => (
                  <div key={`dummy-${i}`} className="w-16 h-16 rounded-xl border-2 border-[#f4cda3] bg-white" />
                ))}
            </div>

            <button
              onClick={() => setThumbStart((prev) => Math.min(allImages.length - THUMB_VISIBLE, prev + 1))}
              disabled={thumbStart + THUMB_VISIBLE >= allImages.length}
              className="p-1 rounded-full border border-[#f4cda3] bg-white text-[#804000] disabled:opacity-30 hover:bg-[#f4cda3] transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT — Detail Produk */}
        <div className="flex flex-col justify-center">

          {/* NAMA */}
          <h1 className="text-2xl font-bold text-[#5a2e0f] mb-1">{product.name}</h1>

          {/* HARGA */}
          <p className="text-2xl font-bold text-[#804000] mb-5">
            Rp{Number(product.price).toLocaleString("id-ID")}
          </p>

          {/* WARNA */}
          <p className="text-sm font-semibold text-[#5a2e0f] mb-2">Warna</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedColor === color
                    ? "bg-[#804000] text-white"
                    : "bg-[#f4cda3] text-[#5a2e0f] hover:bg-[#e9b87e]"
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          {/* UKURAN */}
          <p className="text-sm font-semibold text-[#5a2e0f] mb-2">Ukuran</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedSize === size
                    ? "bg-[#804000] text-white"
                    : "bg-[#f4cda3] text-[#5a2e0f] hover:bg-[#e9b87e]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* TOMBOL BELI + WISHLIST */}
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-pink1 hover:bg-oren2 text-white font-semibold py-3 rounded-full shadow-md transition active:scale-95">
              Beli sekarang
            </button>
            <button
              onClick={() => setIsWished((prev) => !prev)}
              className={`p-3 border-2 rounded-full transition ${
                isWished
                  ? "bg-[#d17261] border-[#d17261] text-white"
                  : "border-[#d17261] text-[#d17261] hover:bg-[#d17261]/10"
              }`}
            >
              <Heart size={20} className={isWished ? "fill-white" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* TAB DESKRIPSI / REVIEW — full width di bawah */}
      <div className="max-w-5xl mx-auto bg-white border-2 border-[#f4cda3] rounded-3xl p-6">
        <div className="flex border-b border-[#f4cda3] mb-5">
          <button
            onClick={() => setActiveTab("deskripsi")}
            className={`flex-1 py-3 font-semibold text-sm transition ${
              activeTab === "deskripsi"
                ? "text-[#804000] border-b-4 border-[#804000]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Deskripsi
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`flex-1 py-3 font-semibold text-sm transition ${
              activeTab === "review"
                ? "text-[#804000] border-b-4 border-[#804000]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Review
          </button>
        </div>

        {activeTab === "deskripsi" ? (
          <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
        ) : (
          <p className="text-gray-500 italic text-sm">Belum ada review.</p>
        )}
      </div>
    </div>
  );
}