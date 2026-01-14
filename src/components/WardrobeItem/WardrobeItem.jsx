import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import bgLemari from "../../assets/bgLemari.png";

export default function WardrobeItem() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* ======== Background ======== */}
      <div className="absolute inset-0">
        <div className="bg-[#FFEBC8] h-full w-full"></div>
        <div className="absolute bottom-0 left-0 w-full bg-pink2 h-[200px]">
          <div className="absolute -top-[260px] w-full h-[500px] bg-pink2 rounded-[9999px]"></div>
        </div>
      </div>

      {/* ======== Konten ======== */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-center text-[#B13B3B] font-bold text-2xl md:text-3xl mb-8">
          OURFIT’S WARDROBE
        </h2>

        <div className="relative w-full max-w-6xl">
          <img
            src={bgLemari}
            alt="Lemari"
            className="w-full max-w-6xl h-auto object-contain mx-auto"
          />

          <div className="absolute z-10 top-[5%] left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-[13rem] justify-items-center">
            
            {/* PRODUK ASLI */}
            {products.slice(0, 2).map((product) => (
              <div
                key={product._id}
                className="w-[325px] h-[350px] bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-95"
              >
                {product.image ? (
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 font-semibold">
                    FOTO PRODUK
                  </span>
                )}
              </div>
            ))}

            {/* TOMBOL */}
            <div className="w-[330px] h-[500px] bg-transparent flex flex-col items-center justify-end pb-4">
              <Link
                to="/wardrobe"
                className="border border-white text-white bg-[#8A3E2D] rounded-full px-16 py-2 text-sm hover:bg-white hover:text-coklat transition-all shadow-md"
              >
                Lihat Selengkapnya &gt;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
