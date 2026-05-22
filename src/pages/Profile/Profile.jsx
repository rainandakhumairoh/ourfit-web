import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hasil");

  // Sample data
  const hasil = [
    { id: 1, name: "Style 1", image: null },
    { id: 2, name: "Style 2", image: null },
    { id: 3, name: "Style 3", image: null }
  ];

  const wishlist = [
    { id: 1, name: "Item 1", image: null },
    { id: 2, name: "Item 2", image: null },
    { id: 3, name: "Item 3", image: null }
  ];

  const bookmark = [
    { id: 1, name: "Article 1", image: null },
    { id: 2, name: "Article 2", image: null },
    { id: 3, name: "Article 3", image: null }
  ];

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      logout();
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6E0] to-[#E8C4B8] font-['Poppins']">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink1">OURFIT</h1>
          <div className="flex gap-4 items-center">
            <button className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
              Home
            </button>
            <button className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
              Personalization
            </button>
            <button className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
              New In
            </button>
            <button className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
              About Us
            </button>
            <button className="text-[#8B5A4A] hover:text-pink1 transition font-medium">
              Cart
            </button>
          </div>
          <button 
            onClick={handleLogout}
            className="text-pink1 hover:text-[#B23D2E] transition"
          >
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
            {/* Avatar Circle */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg">
              <span className="text-gray-400 font-semibold text-xl">AVATAR</span>
            </div>

            {/* Username & Buttons */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-2xl font-bold text-[#5A4A3A]">
                  {user?.username || "Guest User"}
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

              {/* Buttons */}
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

        {/* Tabs Section */}
        <div className="bg-pink1 rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="grid grid-cols-3 gap-0">
            <button
              onClick={() => setActiveTab("hasil")}
              className={`py-6 font-bold text-lg transition ${
                activeTab === "hasil"
                  ? "bg-pink1 text-white border-b-4 border-white"
                  : "bg-[#D4847A] text-white hover:bg-pink1"
              }`}
            >
              HASIL PERSONALISASI
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`py-6 font-bold text-lg transition ${
                activeTab === "wishlist"
                  ? "bg-pink1 text-white border-b-4 border-white"
                  : "bg-[#D4847A] text-white hover:bg-pink1"
              }`}
            >
              WISHLIST
            </button>
            <button
              onClick={() => setActiveTab("bookmark")}
              className={`py-6 font-bold text-lg transition ${
                activeTab === "bookmark"
                  ? "bg-pink1 text-white border-b-4 border-white"
                  : "bg-[#D4847A] text-white hover:bg-pink1"
              }`}
            >
              BOOKMARK
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-pink1 p-8">
            {/* Hasil Personalisasi */}
            {activeTab === "hasil" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hasil.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300"
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 font-semibold">FOTO PRODUK</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-[#5A4A3A] font-medium">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300"
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 font-semibold">FOTO PRODUK</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-[#5A4A3A] font-medium">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bookmark */}
            {activeTab === "bookmark" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bookmark.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 duration-300"
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 font-semibold">FOTO PRODUK</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-[#5A4A3A] font-medium">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}