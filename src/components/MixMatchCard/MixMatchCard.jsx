import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MixMatchCard({ item, onSaveToggle, isSaved }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 aspect-square">
      <div
        onClick={() => navigate(`/mixmatch/${item._id}`)}
        className="relative bg-white border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        {/* SAVE BUTTON */}
        {/* <button
        onClick={handleBookmarkToggle}
        disabled={loadingBookmark}
        className={`p-2 border-2 rounded-full transition absolute top-3 right-3 z-10 ${
          isSaved
            ? "bg-pink1 border-pink1 text-white"
            : "bg-white text-pink1 hover:bg-white/50"
        } ${loadingBookmark ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Bookmark size={20} className={isSaved ? "fill-white" : ""} />
      </button> */}

        {/* IMAGE */}
        <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
          <img src={`${item.image}`} alt={item.title} className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}
