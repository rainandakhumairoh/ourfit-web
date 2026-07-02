import { useState, useRef, useEffect } from "react";
import { Search, Heart, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "All Product",
  "Top",
  "Bottom",
  "Outer",
  "Dress",
];

const SORT_OPTIONS = [
  { label: "Default", value: "default", icon: <ArrowUpDown size={14} /> },
  { label: "Harga Terendah", value: "price_asc", icon: <ArrowUp size={14} /> },
  { label: "Harga Tertinggi", value: "price_desc", icon: <ArrowDown size={14} /> },
  { label: "Nama A–Z", value: "name_asc", icon: <ArrowUpDown size={14} /> },
  { label: "Nama Z–A", value: "name_desc", icon: <ArrowUpDown size={14} /> },
];

function LoginPopup({ onClose, onLogin }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl px-8 py-8 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[popIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>

        <div className="text-center font-[Poppins]">
          <h3 className="text-lg font-bold text-gray-800">Login Dulu, Yuk!</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Kamu perlu login untuk menyimpan dan melihat produk favorit kamu.
          </p>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-2.5 bg-pink1 hover:bg-pink2 text-white font-medium rounded-full transition-colors text-sm"
        >
          Login Sekarang
        </button>

        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Nanti saja
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// SortDropdown — standalone agar mudah reuse
function SortDropdown({ sortValue, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-pink1 shadow-sm transition-colors
          ${open ? "bg-pink1 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
      >
        <span className="flex items-center gap-1">
          {selected.icon}
          {selected.label}
        </span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-30 animate-[popIn_0.18s_ease-out]">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors
                ${sortValue === opt.value
                  ? "text-pink1 font-semibold bg-pink-50"
                  : "text-gray-600 hover:bg-gray-50"}`}
            >
              <span className={sortValue === opt.value ? "text-pink1" : "text-gray-400"}>
                {opt.icon}
              </span>
              {opt.label}
              {sortValue === opt.value && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink1" />
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Props baru:
//   sortValue       – nilai sort aktif (dikontrol parent)
//   onSortChange    – callback saat sort berubah
//   searchValue     – nilai search aktif (dikontrol parent)
//   onSearchChange  – callback saat search berubah
// ─────────────────────────────────────────────────────────────
export default function ProductTopSection({
  activeCategory,
  onCategoryChange,
  currentUser,
  // Sort
  sortValue = "default",
  onSortChange,
  // Search
  searchValue = "",
  onSearchChange,
}) {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // State lokal hanya dipakai jika parent tidak menyediakan handler
  const [localSearch, setLocalSearch] = useState("");
  const [localSort, setLocalSort] = useState("default");

  const isSearchControlled = typeof onSearchChange === "function";
  const isSortControlled = typeof onSortChange === "function";

  const currentSearch = isSearchControlled ? searchValue : localSearch;
  const currentSort = isSortControlled ? sortValue : localSort;

  const handleSearchChange = (val) => {
    if (isSearchControlled) onSearchChange(val);
    else setLocalSearch(val);
  };

  const handleSortChange = (val) => {
    if (isSortControlled) onSortChange(val);
    else setLocalSort(val);
  };

  const handleWishClick = () => {
    if (!currentUser) {
      setShowLoginPopup(true);
    } else {
      navigate("/favorite");
    }
  };

  const SearchBar = (
  <div className="w-full md:w-[420px] relative">
    <input
      type="text"
      placeholder="Cari produk..."
      value={currentSearch}
      onChange={(e) => handleSearchChange(e.target.value)}
      className="w-full rounded-full px-5 py-2 text-sm outline-none bg-white pr-10"
    />

    {currentSearch && (
      <button
        onClick={() => handleSearchChange("")}
        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    )}

    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink1 text-white rounded-full p-1.5">
      <Search size={14} />
    </button>
  </div>
);

  return (
    <>
      <div className="bg-primary pt-24 pb-5 px-6">
        <div className="max-w-6xl mx-auto">
        <>
          {/* MOBILE */}
          <div className="md:hidden space-y-3">

            {SearchBar}

            <div className="flex items-center justify-between">
              <SortDropdown
                sortValue={currentSort}
                onChange={handleSortChange}
              />

              <button
                onClick={handleWishClick}
                title={
                  !currentUser
                    ? "Login untuk melihat produk favorit"
                    : "Lihat favorit saya"
                }
                className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium bg-white text-pink1 hover:bg-pink1 hover:text-white transition-colors shadow-sm"
              >
                <Heart size={14} />
                Favorite
              </button>
            </div>

          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">

            <div className="flex justify-start">
              <SortDropdown
                sortValue={currentSort}
                onChange={handleSortChange}
              />
            </div>

            <div className="flex justify-center">
              {SearchBar}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleWishClick}
                title={
                  !currentUser
                    ? "Login untuk melihat produk favorit"
                    : "Lihat favorit saya"
                }
                className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium bg-white text-pink1 hover:bg-pink1 hover:text-white transition-colors shadow-sm"
              >
                <Heart size={14} />
                Favorite
              </button>
            </div>

          </div>
        </>

          {/* CATEGORY */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 ">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-2 md:px-4 lg:px-6 py-1 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
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

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLogin={() => {
            setShowLoginPopup(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: gunakan fungsi ini di parent/page untuk memfilter
// dan mengurutkan produk berdasarkan state search & sort.
//
// Contoh penggunaan di parent:
//
//   const [search, setSearch] = useState("");
//   const [sort, setSort]     = useState("default");
//
//   const displayedProducts = filterAndSortProducts(allProducts, search, sort);
//
// ─────────────────────────────────────────────────────────────
export function filterAndSortProducts(products = [], search = "", sort = "default") {
  let result = [...products];

  // FILTER by search (nama produk)
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((p) =>
      (p.name ?? p.title ?? "").toLowerCase().includes(q)
    );
  }

  // SORT
  switch (sort) {
    case "price_asc":
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price_desc":
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "name_asc":
      result.sort((a, b) =>
        (a.name ?? a.title ?? "").localeCompare(b.name ?? b.title ?? "")
      );
      break;
    case "name_desc":
      result.sort((a, b) =>
        (b.name ?? b.title ?? "").localeCompare(a.name ?? a.title ?? "")
      );
      break;
    default:
      break;
  }

  return result;
}