import { useState } from "react";
import { Search, Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "All Product",
  "Top",
  "Bottom",
  "Outer",
  "Dress",
];

export default function ProductTopSection({
  activeCategory,
  onCategoryChange,
  currentUser,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleWishlist = () => {
    if (!currentUser) {
      navigate("/login-user");
      return;
    }

    navigate("/favorite");
  };

  return (
    <div className="bg-primary pt-24 pb-5 px-6">
      <div className="max-w-6xl mx-auto">
        {/* BAR ATAS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* SORT */}
          <button className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs text-gray-600 shadow-sm">
            Sort by
            <ChevronDown size={14} />
          </button>

          {/* SEARCH */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full px-5 py-2 text-sm outline-none bg-white"
            />

            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#d17261] text-white rounded-full p-1.5">
              <Search size={14} />
            </button>
          </div>

          {/* WISHLIST */}
          <button
            onClick={handleWishlist}
            className="flex items-center gap-1 bg-white rounded-full px-4 py-2 text-xs text-gray-600 shadow-sm"
          >
            Wishlist
            <Heart size={14} />
          </button>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-pink1 text-white"
                    : "bg-oren3 text-white hover:bg-pink2"
                }`}
              >
                {cat}
              </button>
          ))}
        </div>
      </div>
    </div>
  );
}