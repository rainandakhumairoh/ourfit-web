import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MixMatchCard({ item, onSaveToggle, isSaved }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/mixmatch/${item.id}`)}
      className="relative bg-[#fff7ed] border-2 border-[#f4cda3] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square cursor-pointer"
    >
      {/* Tombol Save */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // supaya tombol gak ikut klik ke detail
          onSaveToggle(item.id);
        }}
        className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-transform duration-200 active:scale-90"
      >
        <Bookmark
          size={20}
          className={`${
            isSaved ? "fill-[#5a2e0f] text-[#5a2e0f]" : "text-gray-600"
          } transition-all`}
        />
      </button>

      {/* Gambar */}
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="object-contain w-full h-full p-4"
        />
      </div>
    </div>
  );
}
