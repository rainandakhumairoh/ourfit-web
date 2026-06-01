import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function MixMatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch detail item mix & match
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/mixmatch/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch semua mix & match untuk navigasi prev/next
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/mixmatch`)
      .then((res) => {
        setAllItems(res.data);
        const idx = res.data.findIndex((i) => i._id === id);
        if (idx !== -1) setCurrentIndex(idx);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/mixmatch/${allItems[currentIndex - 1]._id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < allItems.length - 1) {
      navigate(`/mixmatch/${allItems[currentIndex + 1]._id}`);
    }
  };

  if (!item) return <p className="text-center mt-20 text-[#804000]">Memuat...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-primary pt-8">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-8 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50"
      >
        <ArrowLeft size={20} />
      </button>

      {/* ===== BAGIAN ATAS — foto mix & match ===== */}
      <div className="bg-primary flex-1 flex items-center justify-center px-6 py-16 relative min-h-[60vh]">

        {/* PREV */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-6 lg:left-16 bg-[#d17261] text-white p-3 rounded-full shadow disabled:opacity-30 hover:bg-[#b85c4e] transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* KARTU FOTO */}
        <div className="relative w-[400px] sm:w-300 md:w-[500px]">
          {/* Bookmark */}
          <button
            onClick={() => setIsSaved((p) => !p)}
            className="absolute top-3 right-3 z-10"
          >
            <Bookmark
              size={24}
              className={isSaved ? "fill-[#d17261] text-[#d17261]" : "text-[#d17261]"}
            />
          </button>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden aspect-square flex items-center justify-center border border-[#f4cda3]">
            {item.image ? (
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-[#c9a07a] text-sm font-medium text-center px-4">
                FOTO MIX &<br />MATCH
              </p>
            )}
          </div>
        </div>

        {/* NEXT */}
        <button
          onClick={handleNext}
          disabled={currentIndex === allItems.length - 1}
          className="absolute right-6 lg:right-16 bg-[#d17261] text-white p-3 rounded-full shadow disabled:opacity-30 hover:bg-[#b85c4e] transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ===== BAGIAN BAWAH — rekomendasi produk ===== */}
      <div className="bg-pink2 px-6 py-10">
        <h2 className="text-center text-white font-bold text-lg uppercase mb-6">
          Rekomendasi Produk
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {item.products && item.products.length > 0 ? (
            item.products.map((product) => (
              <Link
                key={product._id}
                to={`/wardrobe/${product._id}`}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition hover:scale-105 aspect-square flex flex-col"
              >
                {product.image ? (
                  <img
                    src={`http://localhost:5000${product.coverImage}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#c9a07a] text-xs font-medium">FOTO PRODUK</span>
                  </div>
                )}
              </Link>
            ))
          ) : (
            // Dummy placeholders jika belum ada produk
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl aspect-square flex items-center justify-center shadow"
              >
                <span className="text-[#c9a07a] text-xs font-medium">FOTO PRODUK</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}