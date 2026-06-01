import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function MixMatchCard({
  item,
  onSaveToggle,
  isSaved,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 aspect-square">
    <div
      onClick={() =>
        navigate(`/mixmatch/${item._id}`)
      }
      className="relative bg-white border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center aspect-square transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* SAVE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          onSaveToggle(item._id);
        }}
        className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-transform duration-200 active:scale-90"
      >
        <Bookmark
          size={20}
          className={`${
            isSaved
              ? "fill-[#5a2e0f] text-[#5a2e0f]"
              : "text-gray-600"
          } transition-all`}
        />
      </button>

      {/* IMAGE */}
      <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    </div>
  );
}