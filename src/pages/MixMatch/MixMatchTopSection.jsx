import gantungan from "../../assets/bggantungan2.png";

const CATEGORIES = ["All", "Casual", "Formal", "Sporty", "Elegant"];

export default function MixMatchTopSection({ activeCategory, onCategoryChange }) {
  return (
    <div className="w-full font-[Poppins] pt-20 bg-primary">
      {/* ===== GAMBAR GANTUNGAN ===== */}
      <img
        src={gantungan}
        alt="gantungan"
        className="relative w-full flex flex-col items-center justify-center text-center"
      />

      {/* ===== FILTER BAR (tepat di bawah gantungan) ===== */}
      <div className="w-full bg-pink2 flex flex-col items-center justify-center py-5 px-8 rounded-t-3xl">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-pink1 text-white"
                  : "bg-pink3 text-white hover:bg-oren2"
              }`}
            >
              {cat}
            </button>
          ))}

          <button className="flex items-center gap-1 px-4 py-1 rounded-full text-sm font-medium border border-[#C06B55] bg-white text-[#C06B55] hover:bg-[#fdf0ec] transition-colors ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Bookmark
          </button>
        </div>

        <p className="mt-12 text-3xl font-bold text-center text-white">
          {activeCategory.toUpperCase()}
        </p>
      </div>
    </div>
  );
}