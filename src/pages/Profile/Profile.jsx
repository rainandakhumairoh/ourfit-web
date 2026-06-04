import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hasil");

  const [wished, setWished] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);

  // Fetch Favorites
  useEffect(() => {
    if (!currentUser?.id) return;
    setWishLoading (true);
    axios
      .get(`http://localhost:5000/api/favorite?userId=${currentUser.id}`)
      .then((res) => setWished(res.data))
      .catch((err) => console.error("Gagal memuat favorite:", err))
      .finally(() => setWishLoading(false));
  }, [currentUser]);

  // Fetch Bookmarks
  useEffect(() => {
    if (!currentUser?.id) return;
    setLoadingBookmark(true);
    axios
      .get(`http://localhost:5000/api/bookmarks?userId=${currentUser.id}`)
      .then((res) => setBookmarks(res.data))
      .catch((err) => console.error("Gagal memuat bookmark:", err))
      .finally(() => setLoadingBookmark(false));
  }, [currentUser]);

  const handleDeleteFavorite = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorite/${productId}?userId=${currentUser.id}`
      );
      setWished((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Gagal menghapus favorite:", err);
    }
  };

  const handleDeleteBookmark = async (mixmatchId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookmarks/${mixmatchId}?userId=${currentUser.id}`
      );
      setBookmarks((prev) => prev.filter((item) => item.mixmatchId !== mixmatchId));
    } catch (err) {
      console.error("Gagal menghapus bookmark:", err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) logout();
  };

  const handleEditProfile = () => navigate("/edit-profile");

  // Reusable empty state
  const EmptyState = ({ label }) => (
    <div className="col-span-3 flex flex-col items-center justify-center py-16 gap-3 opacity-70">
      <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-white font-medium">Belum ada {label}</p>
    </div>
  );

  // Reusable loading state
  const LoadingState = () => (
    <div className="col-span-3 flex justify-center py-16">
      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6E0] to-[#E8C4B8] font-['Poppins']">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink1">OURFIT</h1>
          <div className="flex gap-4 items-center">
            {["Home", "Personalization", "New In", "About Us", "Cart"].map((item) => (
              <button key={item} className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
                {item}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="text-pink1 hover:text-[#B23D2E] transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Avatar & User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
          <div className="flex flex-col items-center gap-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-400 font-semibold text-xl uppercase">
                  {currentUser?.username?.[0] ?? "?"}
                </span>
              )}
            </div>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-2xl font-bold text-[#5A4A3A]">
                  {currentUser?.username ?? "Guest User"}
                </h2>
                <button
                  onClick={handleEditProfile}
                  className="text-pink1 hover:text-[#B23D2E] transition"
                  aria-label="Edit profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                    <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleEditProfile}
                  className="px-8 py-3 rounded-full bg-pink1 text-white font-semibold hover:bg-[#B23D2E] transition shadow-md"
                >
                  Edit Avatar
                </button>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 rounded-full bg-gray-300 text-[#5A4A3A] font-semibold hover:bg-gray-400 transition shadow-md"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-pink1 rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="grid grid-cols-3">
            {[
              { key: "hasil", label: "HASIL PERSONALISASI" },
              { key: "favorite", label: "FAVORITE" },
              { key: "bookmark", label: "BOOKMARK" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-6 font-bold text-lg transition ${
                  activeTab === tab.key
                    ? "bg-pink1 text-white border-b-4 border-white"
                    : "bg-[#D4847A] text-white hover:bg-pink1"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-pink1 p-8">
            {/* Hasil Personalisasi */}
            {activeTab === "hasil" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EmptyState label="hasil personalisasi" />
              </div>
            )}

            {/* Favorite */}
            {activeTab === "favorite" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishLoading ? (
                  <LoadingState />
                ) : wished.length === 0 ? (
                  <EmptyState label="produk favorit" />
                ) : (
                  wished.map((item) => (
                    <div
                      onClick={() => navigate(`/wardrobe/${item.productId}`)}
                      className=" relative group bg-white border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                      {/* Tombol hapus */}
                      <button
                        onClick={() => handleDeleteFavorite(item.productId)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        title="Hapus dari favorite"
                      >
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="aspect-square w-full overflow-hidden">
                        {item.image ? (
                          <img src={`http://localhost:5000${item.image}`} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-sm font-semibold">NO IMAGE</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-sm font-semibold text-black truncate">{item.name}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookmark */}
            {activeTab === "bookmark" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loadingBookmark ? (
                  <LoadingState />
                ) : bookmarks.length === 0 ? (
                  <EmptyState label="bookmark" />
                ) : (
                  bookmarks.map((item) => (
                    <div
                      onClick={() => navigate(`/mixmatch/${item.mixmatchId}`)}
                      className="bg-white border-2 border-oren2 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300 relative group"
                    >
                      {/* Tombol hapus */}
                      <button
                        onClick={() => handleDeleteBookmark(item.mixmatchId)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        title="Hapus bookmark"
                      >
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <img src={`http://localhost:5000${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-sm font-semibold">NO IMAGE</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}