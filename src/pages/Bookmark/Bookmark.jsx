import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Bookmark as BookmarkIcon, ArrowLeft } from "lucide-react";
import axios from "axios";

function BookmarkCard({ item, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 aspect-square">
      <div
        onClick={() => navigate(`/mixmatch/${item.mixmatchId}`)}
        className="relative bg-white border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        {/* REMOVE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.mixmatchId, item._id);
          }}
          className="absolute top-3 right-3 z-10 bg-pink1 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-pink1/70 transition-transform duration-200 active:scale-90"
        >
          <BookmarkIcon
            size={20}
            className="fill-white text-white transition-all"
          />
        </button>

        {/* IMAGE */}
        <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
          {item.image ? (
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-[#c9a07a] text-xs font-medium">No Image</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Bookmark() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) navigate("/login-user");
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/bookmarks?userId=${currentUser.id || currentUser._id}`)
      .then((res) => setBookmarks(res.data))
      .catch((err) => console.error("Gagal memuat bookmark:", err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleRemove = async (mixmatchId, bookmarkId) => {
    const userId = currentUser.id || currentUser._id;
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${mixmatchId}?userId=${userId}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    } catch (err) {
      console.error("Gagal hapus bookmark:", err);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen font-[Poppins] bg-pink2 p-10 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="fixed top-24 left-8 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition z-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center">
          <h2 className="text-center text-white font-bold text-3xl uppercase mb-8 ">
            Bookmark Saya
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-pink1 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookmarkIcon className="w-16 h-16 text-white mb-4" />
            <p className="text-white text-lg font-medium">Belum ada outfit yang di-bookmark</p>
            <p className="text-white/70 text-sm mt-1">Simpan outfit favoritmu dari halaman Mix & Match!</p>
            <button
              onClick={() => navigate("/mixmatch")}
              className="mt-6 px-6 py-2 bg-pink1 text-white rounded-full text-sm font-medium hover:bg-oren2 transition-colors"
            >
              Jelajahi Outfit
            </button>
          </div>
        )}

        {/* Grid — sama persis dengan MixMatch.jsx */}
        {!loading && bookmarks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((item) => (
              <BookmarkCard
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