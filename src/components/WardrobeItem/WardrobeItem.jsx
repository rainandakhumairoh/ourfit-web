import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import bgLemari from "../../assets/bgLemari.png";
import bgelips from "../../assets/bgelips.png";


export default function WardrobeItem() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-full pt-8 md:pt-12 bg-primary overflow-hidden">

      {/* ======== Konten ======== */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-center text-pink1 font-bold text-4xl mb-8 font-[Poppins]">
          OURFIT’S WARDROBE
        </h2>

        {/* desktop */}
        <div className="hidden md:block relative w-full max-w-6xl mx-auto">
          {/* Elips Background */}
          <img
            src={bgelips}
            alt="Elips"
            className="
              absolute
              left-1/2
              bottom-0
              -translate-x-1/2
              w-screen
              max-w-none
              z-0
            "
          />

          {/* Lemari */}
          <img
            src={bgLemari}
            alt="Lemari"
            className="relative z-10 w-full h-auto object-contain"
          />

          <div className="absolute z-10 top-[5%] left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-[13rem] justify-items-center">
            
            {/* PRODUK ASLI */}
            {products.slice(0, 2).map((product) => (
              <Link
                key={product._id}
                to={`/wardrobe/${product._id}`}
                className="w-[325px] h-[350px] bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-95 cursor-pointer"
              >
                {product.coverImage ? (
                  <img
                    src={`http://localhost:5000${product.coverImage}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 font-semibold">
                    FOTO PRODUK
                  </span>
                )}
              </Link>
            ))}

            {/* TOMBOL */}
            <div className="w-[330px] h-[500px] bg-transparent flex flex-col items-center justify-end pb-4">
              <Link
                to="/wardrobe"
                className="border border-white text-white bg-[#8A3E2D] rounded-full px-16 py-2 text-sm hover:bg-white hover:text-coklat transition-all shadow-md"
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden w-full px-4">
          {/* Elips Background */}
          <img
            src={bgelips}
            alt="Elips"
            className="
              absolute
              left-1/2
              bottom-0
              -translate-x-1/2
              origin-bottom
              z-0
            "
          />
        <div className="relative px-6 py-6 bg-coklat rounded-2xl z-10 border-2 border-oren2 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {products.slice(0, 2).map((product) => (
              <Link
                key={product._id}
                to={`/wardrobe/${product._id}`}
                className="bg-[#A95C18] border-2 border-oren2 rounded-2xl p-3 aspect-square shadow-md"
              >
                <div className="w-full h-full bg-white border-2 border-oren2 rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer">

                  {/* Gambar */}
                  <div className="flex-1 overflow-hidden">
                    {product.coverImage ? (
                      <img
                        src={`http://localhost:5000${product.coverImage}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        FOTO PRODUK
                      </div>
                    )}
                  </div>

                  {/* Nama Produk */}
                  <div className="bg-primary text-black font-bold text-center text-medium py-2">
                    {product.name}
                  </div>

                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to="/wardrobe"
              className="border border-white text-white bg-[#8A3E2D] rounded-full px-16 py-2 text-sm hover:bg-white hover:text-coklat transition-all shadow-md"
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
