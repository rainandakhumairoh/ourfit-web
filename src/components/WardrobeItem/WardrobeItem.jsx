import { Link } from "react-router-dom";
import bgLemari from "../../assets/bgLemari.png";

export default function WardrobeItem({ products = [] }) {
  // Dummy data sementara buat tes tampilan
  if (products.length === 0) {
    products = [
      { _id: 1, title: "Produk 1", imageCover: "https://via.placeholder.com/150" },
      { _id: 2, title: "Produk 2", imageCover: "https://via.placeholder.com/150" },
    ];
  }
  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* ======== Latar belakang cream & pink ======== */}
      <div className="absolute inset-0">
        <div className="bg-[#FFEBC8] h-full w-full "></div>
        <div className="absolute bottom-0 left-0 w-full bg-pink2 h-[200px]">
          <div className="absolute -top-[260px] bottom-0 left-0 w-full h-[500px] bg-pink2 rounded-[9999px]"></div>
        </div>
      </div>

      {/* ======== Konten utama ======== */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Judul */}
        <h2 className="text-center text-[#B13B3B] font-bold text-2xl md:text-3xl mb-8">OURFIT’S WARDROBE</h2>

        {/* ======== Lemari Section ======== */}
        <div className="relative w-full max-w-6xl">
          {/* Background lemari */}
          <img src={bgLemari} alt="Lemari" className="w-full max-w-6xl h-auto object-contain mx-auto" />

          {/* Isi lemari */}
          <div className="absolute z-10 top-[5%] left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-[13rem] justify-items-center">
            {/* Dua foto produk */}
            {products.slice(0, 2).map((product) => (
              <div key={product._id} className="w-[325px] h-[350px] bg-white rounded-xl shadow-lg flex items-center justify-center">
                {product.imageCover ? <img src={product.imageCover} alt={product.title} className="object-contain max-h-[480px]" /> : <span className="text-gray-400 font-semibold">FOTO PRODUK</span>}
              </div>
            ))}
            {/* Kolom ketiga: tombol di dalam kolom */}
            <div className="w-[330px] h-[500px] bg-transparent flex flex-col items-center justify-end pb-4">
              <Link to="/wardrobe" className="border border-white text-white bg-[#8A3E2D] rounded-full px-16 py-2 text-sm flex items-center gap-2 hover:bg-white hover:text-coklat transition-all duration-300 shadow-md">
                Lihat Selengkapnya &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
