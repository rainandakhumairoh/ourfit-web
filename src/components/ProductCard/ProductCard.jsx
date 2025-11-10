import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product, isWished, onWishlistToggle }) {
  return (
    <div className="relative bg-[#A95C18] border-2 border-oren2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-4 aspect-square">

      {/* Kotak Putih - Isi Semua Konten */}
      <div className="w-full aspect-square bg-white border-2 border-oren2 rounded-xl flex flex-col justify-between p-3 overflow-hidden">
        
      {/* Tombol Wishlist */}
      <button
        onClick={() => onWishlistToggle(product.id)}
        className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-transform duration-200 active:scale-90"
      >
        <Heart
          size={20}
          className={`${
            isWished ? "fill-red-500 text-red-500" : "text-gray-600"
          } transition-all`}
        />
      </button>

        {/* Gambar Produk */}
        <div className="flex-1 flex items-center justify-center mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-32 h-32 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info Produk */}
        <div >
          <h3 className="font-semibold text-[#5a2e0f] text-sm mb-1 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-[#8b5e3c] font-medium mb-2 text-sm">
            Rp{(product.price * 10000).toLocaleString("id-ID")}
          </p>

          <Link
            to={`/wardrobe/${product.id}`}
            className="block w-full bg-[#804000] hover:bg-[#663300] text-white font-semibold py-2 rounded-lg shadow-sm transition-all text-sm"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
