import { useContext, useState, useEffect } from "react";
import api from "../../api/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import avatar1 from "../../assets/ava1.png";
import avatar2 from "../../assets/ava2.png";
import avatar3 from "../../assets/ava3.png";
import avatar4 from "../../assets/ava4.png";
import avatar5 from "../../assets/ava5.png";
import avatar6 from "../../assets/ava6.png";
import PersonalizationCard from "../../components/PersonalizationCard/PersonalizationCard";

// ── Avatar preset ─────────────────────────────────────────────
// Saat aset sudah siap, ganti `placeholder` dengan path gambar:
// misal: image: "/avatars/avatar1.png"
const AVATAR_PRESETS = [
  { id: "avatar1", label: "A1", image: avatar1 },
  { id: "avatar2", label: "A2", image: avatar2 },
  { id: "avatar3", label: "A3", image: avatar3 },
  { id: "avatar4", label: "A4", image: avatar4 },
  { id: "avatar5", label: "A5", image: avatar5 },
  { id: "avatar6", label: "A6", image: avatar6 },
];

// Komponen tampilan satu preset (pakai gambar kalau ada, fallback ke inisial)
function AvatarOption({ preset, selected, onClick, size = "sm" }) {
  const [imgError, setImgError] = useState(false);
  const dim = size === "lg" ? "w-36 h-36" : "w-16 h-16";
  const textSize = size === "lg" ? "text-3xl" : "text-sm";

  return (
    <button
      onClick={onClick}
      className={`${dim} rounded-full flex items-center justify-center font-bold transition-all duration-200 flex-shrink-0
        ${selected ? "ring-4 ring-pink1 ring-offset-2 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"}`}
      style={{ background: preset.color }}
    >
      {!imgError ? <img src={preset.image} alt={preset.label} className="w-full h-full object-cover rounded-full" onError={() => setImgError(true)} /> : <span className={`${textSize} text-white font-bold select-none`}>{preset.label}</span>}
    </button>
  );
}

// Modal Edit Avatar
function EditAvatarModal({ currentAvatarId, onSave, onClose }) {
  const [selected, setSelected] = useState(currentAvatarId || AVATAR_PRESETS[0].id);
  const selectedPreset = AVATAR_PRESETS.find((p) => p.id === selected) ?? AVATAR_PRESETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-[#FDF3EE] rounded-3xl shadow-2xl px-10 py-10 mx-4 w-full max-w-md flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()} style={{ fontFamily: "Poppins, sans-serif" }}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-bold text-[#5A4A3A]">Pilih Avatar</h3>

        {/* Preview besar */}
        <AvatarOption preset={selectedPreset} selected={false} onClick={() => {}} size="lg" />

        {/* Deretan opsi */}
        <div className="flex grid grid-cols-3 gap-3 flex-wrap justify-center">
          {AVATAR_PRESETS.map((preset) => (
            <AvatarOption key={preset.id} preset={preset} selected={selected === preset.id} onClick={() => setSelected(preset.id)} size="sm" />
          ))}
        </div>

        {/* Tombol simpan */}
        <button onClick={() => onSave(selectedPreset)} className="w-full py-3 bg-pink1 hover:bg-[#B23D2E] text-white font-semibold rounded-full transition shadow-md text-sm">
          Pilih Avatar
        </button>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const { currentUser, login, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hasil");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [wished, setWished] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [personalization, setPersonalization] = useState(null);
  const [loadingPersonalization, setLoadingPersonalization] = useState(false);

  // Fetch Favorites
  useEffect(() => {
    if (!currentUser?.id) return;
    setWishLoading(true);
    api
      .get(`/favorite?userId=${currentUser.id}`)
      .then((res) => setWished(res.data))
      .catch((err) => console.error("Gagal memuat favorite:", err))
      .finally(() => setWishLoading(false));
  }, [currentUser]);

  // Fetch Bookmarks
  useEffect(() => {
    if (!currentUser?.id) return;
    setLoadingBookmark(true);
    api
      .get(`/bookmarks?userId=${currentUser.id}`)
      .then((res) => setBookmarks(res.data))
      .catch((err) => console.error("Gagal memuat bookmark:", err))
      .finally(() => setLoadingBookmark(false));
  }, [currentUser]);

  const handleDeleteFavorite = async (productId) => {
    try {
      await api.delete(`/favorite/${productId}?userId=${currentUser.id}`);
      setWished((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Gagal menghapus favorite:", err);
    }
  };

  const handleDeleteBookmark = async (mixmatchId) => {
    try {
      await api.delete(`/bookmarks/${mixmatchId}?userId=${currentUser.id}`);
      setBookmarks((prev) => prev.filter((item) => item.mixmatchId !== mixmatchId));
    } catch (err) {
      console.error("Gagal menghapus bookmark:", err);
    }
  };

  const handleSaveAvatar = async (preset) => {
    try {
      const userId = currentUser.id || currentUser._id;

      const res = await api.put(`/auth/users/${userId}/avatar`, {
        avatarId: preset.id,
      });

      login(res.data);

      setShowAvatarModal(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert("Gagal menyimpan avatar");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) logout();
  };

  // Resolve avatar saat ini
  const currentPreset = AVATAR_PRESETS.find((p) => p.id === currentUser?.avatarId);
  const [avatarImgError, setAvatarImgError] = useState(false);

  const EmptyState = ({ label }) => (
    <div className="col-span-3 flex flex-col items-center justify-center py-16 gap-3 opacity-70">
      <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-white font-medium">Belum ada {label}</p>
    </div>
  );

  const LoadingState = () => (
    <div className="col-span-3 flex justify-center py-16">
      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );

  useEffect(() => {
    if (!currentUser?.id && !currentUser?._id) return;

    getPersonalization();
  }, [currentUser]);

  // Fetch — sesuaikan endpoint & struktur
  async function getPersonalization() {
    try {
      setLoadingPersonalization(true);
      const userId = currentUser.id || currentUser._id;
      const res = await api.get(`/personalization/${userId}`);
      // API mengembalikan array, ambil yang terbaru (index 0)
      setPersonalization(res.data ?? null);
    } catch (err) {
      console.error("Gagal mengambil personalisasi:", err);
    } finally {
      setLoadingPersonalization(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fff7ed] font-['Poppins']">
      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
        <div className="bg-white rounded-2xl shadow-sm p-12 mb-12">
          <div className="flex flex-col items-center gap-6">
            {/* Avatar besar + tombol edit overlay */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden shadow-lg" style={{ background: currentPreset?.color ?? "#E0E0E0" }}>
                {currentPreset ? <img src={currentPreset.image} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-white text-5xl font-bold uppercase">{currentUser?.username?.charAt(0) || "?"}</span>}
              </div>
              {/* Overlay edit on hover */}
              <button onClick={() => setShowAvatarModal(true)} className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
                </svg>
              </button>
            </div>

            {/* Username */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-[#5A4A3A]">{currentUser?.username ?? "Guest User"}</h2>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => setShowAvatarModal(true)} className="px-8 py-3 rounded-full bg-pink1 text-white font-semibold hover:bg-oren2 transition shadow-md">
                  Edit Avatar
                </button>
                <button onClick={handleLogout} className="px-8 py-3 rounded-full bg-gray-200 text-[#5A4A3A] font-semibold hover:bg-gray-300 transition shadow-md">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-pink2 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3">
            {[
              { key: "hasil", label: "HASIL PERSONALISASI" },
              { key: "favorite", label: "FAVORITE" },
              { key: "bookmark", label: "BOOKMARK" },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`py-6 font-bold text-lg transition ${activeTab === tab.key ? "bg-pink1 text-white border-b-4 border-white" : "bg-pink2 text-white hover:bg-pink1"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-pink1 p-8">
            {/* Hasil Personalisasi */}
            {activeTab === "hasil" && (
              <>{loadingPersonalization ? <LoadingState /> : personalization ? <PersonalizationCard smart={personalization.smartFit} styleRes={personalization.styleQuiz} readOnly={true} /> : <EmptyState label="hasil personalisasi" />}</>
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
                          <img src={`${item.image}`} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
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
                      key={item._id}
                      onClick={() => navigate(`/mixmatch/${item.mixmatchId}`)}
                      className="bg-white border-2 border-oren2 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300 relative group cursor-pointer aspect-square"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBookmark(item.mixmatchId);
                        }}
                        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        title="Hapus bookmark"
                      >
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <img src={`${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-sm font-semibold">NO IMAGE</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-sm font-semibold text-[#5A4A3A] truncate">{item.title}</p>
                        {item.category && <span className="inline-block mt-1 px-3 py-0.5 bg-pink-100 text-pink1 text-xs rounded-full">{item.category}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Edit Avatar */}
      {showAvatarModal && <EditAvatarModal currentAvatarId={currentUser?.avatarId} onSave={handleSaveAvatar} onClose={() => setShowAvatarModal(false)} />}
    </div>
  );
}
