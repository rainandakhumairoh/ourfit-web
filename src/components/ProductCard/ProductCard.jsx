import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product, isWished, onWishlistToggle }) {
  return (
    <div className="bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 aspect-square">

      {/* Card Putih */}
      <div className="relative w-full h-full bg-white border-2 border-oren2 rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">

        {/* ❤️ Wishlist (LAPISAN PALING ATAS) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWishlistToggle(product._id);
          }}
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition"
        >
          <Heart
            size={20}
            className={
              isWished
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>

        {/* 🖼️ GAMBAR (TANPA ROUNDED BAWAH) */}
        <div className="w-full flex-1 overflow-hidden">
          <img
            src={`http://localhost:5000${product.coverImage}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🏷️ NAMA PRODUK (TANPA ROUNDED ATAS) */}
        <Link
          to={`/wardrobe/${product._id}`}
          className="w-full bg-primary hover:bg-white text-black font-bold py-3 text-center text-sm transition"
        >
          {product.name}
        </Link>
      </div>
    </div>
  );
}
