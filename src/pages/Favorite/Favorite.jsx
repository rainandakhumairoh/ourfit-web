import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Heart, ArrowLeft } from "lucide-react";
import axios from "axios";

function FavoriteCard({ item, onRemove }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 aspect-square">
      <div
        onClick={() => navigate(`/wardrobe/${item.productId}`)}
        className="relative bg-white border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(item.productId, item._id); }}
        className="absolute top-3 right-3 z-10 bg-pink1 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-pink1/70 transition-transform duration-200 active:scale-90"
      >
        <Heart size={20} className="fill-white text-white" />
      </button>

      <div className="aspect-square w-full overflow-hidden">
        {item.image ? (
          <img
            src={`http://localhost:5000${item.image}`}
            alt={item.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#fdf0e4] flex items-center justify-center">
            <span className="text-[#c9a07a] text-xs">No Image</span>
          </div>
        )}
      </div>

      <div className="w-full bg-primary hover:bg-white text-black font-bold py-3 text-center text-sm transition">
        <p className="text-sm font-semibold text-black truncate">{item.name}</p>
      </div>
    </div>
    </div>
  );
}

export default function Favorite() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) navigate("/login-user");
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser.id || currentUser._id;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/favorite?userId=${userId}`)
      .then((res) => setFavorite(res.data))
      .catch((err) => console.error("Gagal memuat favorit:", err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleRemove = async (productId, favoriteId) => {
    const userId = currentUser.id || currentUser._id;
    try {
      await axios.delete(`http://localhost:5000/api/favorite/${productId}?userId=${userId}`);
      setFavorite((prev) => prev.filter((w) => w._id !== favoriteId));
    } catch (err) {
      console.error("Gagal hapus favorit:", err);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen font-[Poppins] bg-coklat p-10 pt-28">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="fixed top-24 left-8 bg-pink3 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-center text-white font-bold text-3xl uppercase mb-8">
          Favorit Saya
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-pink1 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && favorite.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-16 h-16 text-white mb-4" />
            <p className="text-white text-lg font-medium">Belum ada produk favorit</p>
            <p className="text-white/70 text-sm mt-1">
              Klik ikon ❤ di halaman produk untuk menyimpan!
            </p>
            <button
              onClick={() => navigate("/wardrobe")}
              className="mt-6 px-6 py-2 bg-pink3 text-white rounded-full text-sm font-medium hover:bg-oren2 transition-colors"
            >
              Jelajahi Produk
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && favorite.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorite.map((item) => (
              <FavoriteCard
                key={item._id}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}