import { Link } from "react-router-dom";
import bgGantungan from "../../assets/bggantungan.png";
import bgBordir from "../../assets/bgbordir2.png";

export default function MixMatchItem({ items = [] }) {
  if (items.length === 0) {
    items = [
      { id: 1, image: "https://via.placeholder.com/200x200", title: "Mix & Match 1" },
      { id: 2, image: "https://via.placeholder.com/200x200", title: "Mix & Match 2" },
      { id: 3, image: "https://via.placeholder.com/200x200", title: "Mix & Match 3" },
    ];
  }

  return (
    <div className="relative w-full overflow-hidden pb-32">
      {/* ======== ATAS: TEKS ======== */}
      <div className="relative w-full bg-pink2 pb-16">
        <div className="text-center pt-16 pb-10">
            <h1
                className="text-pink1 font-extrabold text-3xl mb-3 tracking-wide"
                style={{
                textShadow:
                    "4px 4px 0 #fff, -4px 4px 0 #fff, 4px -4px 0 #fff, -4px -4px 0 #fff", // outline putih
                }}
            >
                MIX & MATCH
            </h1>
          <p className="text-white text-sm max-w-xl mx-auto leading-relaxed">
            Jelajahi berbagai kombinasi outfit dan temukan inspirasi gaya baru setiap hari! <br />
            Fitur Mix & Match ini membantu kamu memadupadankan produk Ourfit sesuai warna, potongan, dan gaya favoritmu.

          </p>
        </div>

        {/* ======== GANTUNGAN + BORDIR ======== */}
        <div className="relative w-full flex flex-col items-center justify-center bg-cover bg-center">
          {/* BORDIR di bawah gantungan */}
          <img
            src={bgBordir}
            alt="Bordir bawah"
            className="absolute bottom-[-15em] w-full object-cover z-0"
          />

          {/* GANTUNGAN di atas bordir */}
          <img
            src={bgGantungan}
            alt="Gantungan"
            className="relative w-full h-auto object-contain z-10"
          />

          {/* Kotak foto */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[85%] max-w-5xl flex justify-center gap-6 px-6 z-20">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[300px] h-[300px] bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-oren1"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 font-semibold text-center leading-tight">
                    FOTO <br /> MIX & MATCH
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======== TOMBOL di atas bordir ======== */}
      <div className="relative z-30 flex justify-center mt-0">
        <Link
          to="/mixmatch"
          className="border border-white text-white bg-pink1 rounded-full px-16 py-2 text-sm flex items-center gap-2 hover:bg-white hover:text-[#B13B3B] transition-all duration-300 shadow-md"
        >
          Lihat Selengkapnya &gt;
        </Link>
      </div>
    </div>
  );
}
