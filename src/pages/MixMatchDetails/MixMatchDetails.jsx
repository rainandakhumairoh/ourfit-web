import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { ArrowLeft, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function LoginPopup({ onClose, onLogin }) {
  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      {/* Modal Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl px-8 py-8 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[popIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
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
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">Kamu perlu login untuk menyimpan dan melihat outfit bookmark kamu.</p>
        </div>

        {/* Tombol Login */}
        <button onClick={onLogin} className="w-full py-2.5 bg-pink1 hover:bg-pink2 text-white font-medium rounded-full transition-colors text-sm">
          Login Sekarang
        </button>

        {/* Batalkan */}
        <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
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

export default function MixMatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [item, setItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Fetch detail item
  useEffect(() => {
    api
      .get(`/mixmatch/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch semua item untuk prev/next
  useEffect(() => {
    api
      .get(`/mixmatch`)
      .then((res) => {
        setAllItems(res.data);
        const idx = res.data.findIndex((i) => i._id === id);
        if (idx !== -1) setCurrentIndex(idx);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Cek apakah item ini sudah di-bookmark oleh user ini
  useEffect(() => {
    if (!currentUser || !id) return;

    api
      .get(`/bookmarks?userId=${currentUser.id}`)
      .then((res) => {
        const sudahAda = res.data.some((b) => b.mixmatchId?.toString() === id);
        setIsSaved(sudahAda);
      })
      .catch((err) => console.error("Gagal cek bookmark:", err));
  }, [currentUser, id]);

  // Toggle bookmark
  const handleBookmarkToggle = async () => {
    // Belum login → tampilkan popup
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }

    setLoadingBookmark(true);
    try {
      if (isSaved) {
        // Hapus bookmark
        await api.delete(`/bookmarks/${id}?userId=${currentUser.id}`);
        setIsSaved(false);
      } else {
        // Tambah bookmark
        await api.post("/bookmarks", {
          userId: currentUser.id,
          mixmatchId: id,
          title: item?.title,
          image: item?.image,
          category: item?.category,
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Gagal toggle bookmark:", err);
    } finally {
      setLoadingBookmark(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) navigate(`/mixmatch/${allItems[currentIndex - 1]._id}`);
  };

  const handleNext = () => {
    if (currentIndex < allItems.length - 1) navigate(`/mixmatch/${allItems[currentIndex + 1]._id}`);
  };

  if (!item) return <p className="text-center mt-20 text-[#804000]">Memuat...</p>;

  return (
    <>
      {/* Login Popup */}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} onLogin={() => navigate("/login-user")} />}

      <div className="min-h-screen flex flex-col bg-primary pt-8">
        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} className="fixed top-24 left-8 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50">
          <ArrowLeft size={20} />
        </button>

        <div className="text-center pt-12">
          <h2 className="text-center text-coklat font-bold text-2xl uppercase mb-2">{item.title}</h2>
          {item.category && <span className="inline-block px-3 py-1 bg-[#f4cda3] text-[#5a2e0f] text-xs font-semibold rounded-full">{item.category}</span>}
        </div>

        {/* FOTO */}
        <div className="bg-primary flex-1 flex items-center justify-center px-6 pb-8 pt-2 relative min-h-[60vh]">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="absolute left-6 lg:left-16 bg-[#d17261] text-white p-3 rounded-full shadow disabled:opacity-30 hover:bg-[#b85c4e] transition">
            <ChevronLeft size={20} />
          </button>

          <div className="relative w-[400px] sm:w-300 md:w-[500px]">
            {/* Tombol Bookmark */}
            <button
              onClick={handleBookmarkToggle}
              disabled={loadingBookmark}
              className={`p-2 border-2 rounded-full transition absolute top-3 right-3 z-10 ${isSaved ? "bg-pink1 border-pink1 text-white" : "bg-white text-pink1 hover:bg-white/50"} ${loadingBookmark ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Bookmark size={20} className={isSaved ? "fill-white" : ""} />
            </button>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden aspect-square flex items-center justify-center border border-[#f4cda3]">
              {item.image ? (
                <img src={`${item.image}`} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <p className="text-[#c9a07a] text-sm font-medium text-center px-4">
                  FOTO MIX &<br />
                  MATCH
                </p>
              )}
            </div>
          </div>

          <button onClick={handleNext} disabled={currentIndex === allItems.length - 1} className="absolute right-6 lg:right-16 bg-[#d17261] text-white p-3 rounded-full shadow disabled:opacity-30 hover:bg-[#b85c4e] transition">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* REKOMENDASI PRODUK */}
        <div className="bg-pink2 px-6 py-10">
          <h2 className="text-center text-white font-bold text-lg uppercase mb-6">Rekomendasi Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {item.products && item.products.length > 0
              ? item.products.map((product) => (
                  <Link key={product._id} to={`/wardrobe/${product._id}`} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition hover:scale-105 aspect-square flex flex-col">
                    {product.coverImage ? (
                      <img src={`${product.coverImage}`} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#c9a07a] text-xs font-medium">FOTO PRODUK</span>
                      </div>
                    )}
                  </Link>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl aspect-square flex items-center justify-center shadow">
                    <span className="text-[#c9a07a] text-xs font-medium">FOTO PRODUK</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
