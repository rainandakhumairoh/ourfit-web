import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { UserContext } from "../../context/UserContext"; // sesuaikan path


  function LoginPopup({ onClose, onLogin }) {
  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl px-8 py-8 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[popIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>

        {/* Teks */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">Login Dulu, Yuk!</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Kamu perlu login untuk menyimpan dan melihat outfit favorit kamu.
          </p>
        </div>

        {/* Tombol Login */}
        <button
          onClick={onLogin}
          className="w-full py-2.5 bg-pink1 hover:bg-pink2 text-white font-medium rounded-full transition-colors text-sm"
        >
          Login Sekarang
        </button>

        {/* Batalkan */}
        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Nanti saja
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [thumbStart, setThumbStart] = useState(0);

  const [isWished, setIsWished] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const THUMB_VISIBLE = 5;

    // Fetch detail item
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.coverImage);
      })
      .catch((err) => console.error(err));
  }, [id]);


  // Cek apakah item ini sudah di-bookmark oleh user ini
  useEffect(() => {
    if (!currentUser || !id) return;

    const userId = currentUser.id || currentUser._id;

    axios
      .get(`http://localhost:5000/api/favorite?userId=${userId}`)
      .then((res) => {
        const sudahAda = res.data.some(
          (fav) => fav.productId?.toString() === id
        );

        setIsWished(sudahAda);
      })
      .catch((err) => {
        console.error("Gagal cek favorit:", err);
      });
  }, [currentUser, id]);

  // Toggle favorit
  const handleWishToggle = async () => {
    
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    if (wishLoading) return;

    setWishLoading(true);

    const userId = currentUser.id || currentUser._id;

    try {
      if (isWished) {
        await axios.delete(
          `http://localhost:5000/api/favorite/${id}?userId=${userId}`
        );

        setIsWished(false);
      } else {
        await axios.post(
          "http://localhost:5000/api/favorite",
          {
            userId,
            productId: id,
            name: product.name,
            price: product.price,
            image: product.coverImage,
          }
        );

        setIsWished(true);
      }
    } catch (err) {
      console.error("Gagal update favorit:", err);
    } finally {
      setWishLoading(false);
    }
  };

  if (!product) {
    return <p className="text-center mt-20 text-[#804000]">Memuat produk...</p>;
  }

  const allImages = [product.coverImage, ...(product.images || [])];
  const visibleThumbs = allImages.slice(thumbStart, thumbStart + THUMB_VISIBLE);
  const colors = product.colors || ["Broken white", "Ivory", "Soft pink", "Maroon", "Sage", "Soft blue", "Black"];
  const sizes = product.sizes || ["Petite size", "All size"];

  return (
    <>
    {/* Login Popup */}
    {showLoginPopup && (
      <LoginPopup
        onClose={() => setShowLoginPopup(false)}
        onLogin={() => navigate("/login-user")}
      />
    )}
    <div className="min-h-screen bg-[#fff7ed] px-6 py-10 pt-28">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-8 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* LEFT — Foto + Thumbnail (tidak berubah) */}
        <div className="flex flex-col items-center">
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
                    selectedImage === img ? "border-[#804000]" : "border-[#f4cda3]"
                  }`}
                >
                  {img ? (
                    <img src={`http://localhost:5000${img}`} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white" />
                  )}
                </button>
              ))}
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
          <h1 className="text-2xl font-bold text-[#5a2e0f] mb-1">{product.name}</h1>
          <p className="text-2xl font-bold text-[#804000] mb-5">
            Rp{Number(product.price).toLocaleString("id-ID")}
          </p>

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

          {/* TOMBOL BELI + WISHLIST — ← diupdate */}
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-pink1 hover:bg-oren2 text-white font-semibold py-3 rounded-full shadow-md transition active:scale-95">
              Beli sekarang
            </button>
            <button
              onClick={handleWishToggle}
              disabled={wishLoading}
              title={!currentUser ? "Login untuk menambah ke favorit" : isWished ? "Hapus dari favorit" : "Tambah ke favorit"}
              className={`p-3 border-2 rounded-full transition active:scale-95 disabled:opacity-60 ${
                isWished
                  ? "bg-[#d17261] border-[#d17261] text-white"
                  : "border-[#d17261] text-[#d17261] hover:bg-[#d17261]/10"
              }`}
            >
              <Heart size={20} className={isWished ? "fill-white" : ""} />
            </button>
          </div>

          {/* Teks hint jika belum login */}
          {!currentUser && (
            <p className="text-xs text-[#c9a07a] mt-2 text-center">
              <button onClick={() => navigate("/login-user")} className="underline hover:text-[#804000] transition">
                Login
              </button>{" "}
              untuk menyimpan ke favorit
            </p>
          )}
        </div>
      </div>

      {/* TAB — tidak berubah */}
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
  </>
  );
}