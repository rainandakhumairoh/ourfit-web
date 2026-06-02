import { useState } from "react";
import gantungan from "../../assets/bggantungan2.png";
import { useNavigate } from 'react-router-dom';

const STYLE_CATEGORIES = ["All", "Casual", "Formal", "Feminine", "Elegan", "Streetwear", "Bohemian", "Minimalist"];

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
            Kamu perlu login untuk menyimpan dan melihat outfit bookmark kamu.
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

export default function MixMatchTopSection({ activeCategory, onCategoryChange, currentUser  }) {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleBookmarkClick = () => {
    if (!currentUser ) {
      setShowLoginPopup(true); // tampilkan popup
    } else {
      navigate("/bookmark");
    }
  };

  return (
    <>
      {/* ===== LOGIN POPUP ===== */}
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => navigate("/login-user")}
        />
      )}

      <div className="w-full font-[Poppins] pt-20 bg-primary">
        {/* ===== GAMBAR GANTUNGAN ===== */}
        <img
          src={gantungan}
          alt="gantungan"
          className="relative w-full flex flex-col items-center justify-center text-center"
        />

        {/* ===== FILTER BAR ===== */}
        <div className="w-full bg-pink2 flex flex-col items-center justify-center py-5 px-8 rounded-t-3xl">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {STYLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-pink1 text-white"
                    : "bg-pink3 text-white hover:bg-oren2"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={handleBookmarkClick}
              title={!currentUser  ? "Login untuk melihat bookmark" : "Lihat bookmark saya"}
              className="flex items-center gap-1 px-4 py-1 rounded-full text-sm font-medium border border-pink1 bg-white text-pink1 hover:bg-pink1 hover:text-white transition-colors ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Bookmark
            </button>
          </div>

          <p className="mt-12 text-3xl font-bold text-center text-white">
            {activeCategory.toUpperCase()}
          </p>
          <div className="w-full mt-4 border-t-2 border-dashed border-white" />
        </div>
      </div>
    </>
  );
}