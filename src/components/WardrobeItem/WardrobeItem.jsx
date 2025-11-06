import { Link } from "react-router-dom";
import bgLemari from "../../assets/bgLemari.png";

export default function WardrobeItem({ products = [] }) {
  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* ======== Latar belakang cream & pink ======== */}
      <div className="absolute inset-0">
        {/* Warna cream bagian atas */}
        <div className="bg-primary h-1/2 w-full"></div>
        {/* Warna pink bagian bawah (setengah lingkaran) */}
        <div className="relative bg-pink2 h-1/2 w-full item-center">
          <div className="absolute -top-[80px] left-0 w-screen h-[80px] bg-pink2 rounded-t-full"></div>
        </div>
      </div>

      {/* ======== Konten utama ======== */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Judul */}
        <h2 className="text-center text-[#B13B3B] font-bold text-2xl md:text-3xl mb-8">
          OURFIT’S WARDROBE
        </h2>

        {/* Container lemari */}
        <div className="relative w-full max-w-6xl flex justify-center items-center">
          {/* Gambar lemari */}
          <img
            src={bgLemari}
            alt="Lemari"
            className="w-full max-w-5xl h-auto object-contain"
          />

          {/* Box produk di atas lemari */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col md:flex-row justify-center items-center gap-6 px-4">
            {/* Dua produk */}
            {products.slice(0, 2).map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white hover:scale-105 transition-transform duration-300 rounded-lg w-52 h-56 shadow-md flex items-center justify-center"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="object-contain max-h-44"
                />
              </Link>
            ))}

            {/* Kotak warna & tombol */}
            <div className="bg-[#E6B89C] rounded-lg w-52 h-56 flex flex-col items-center justify-center shadow-md">
              {/* Warna kain */}
              <div className="flex gap-2 mb-4">
                <div className="w-5 h-20 bg-[#F9D3C0]"></div>
                <div className="w-5 h-20 bg-[#F1AFAF]"></div>
                <div className="w-5 h-20 bg-[#E68A89]"></div>
                <div className="w-5 h-20 bg-[#C76767]"></div>
              </div>

              {/* Tombol */}
              <Link
                to="/wardrobe"
                className="flex items-center justify-center bg-[#8A3E2D] hover:bg-[#6E2E22] text-white rounded-full px-5 py-2 text-sm transition"
              >
                Lihat Selengkapnya →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
