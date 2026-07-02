import { Link } from "react-router-dom";
import bgGantungan from "../../assets/bggantungan.png";
import bgGantungan3 from "../../assets/bggantungan3.png";
import bgGantungan4 from "../../assets/bggantungan4.png";
import bgBordir from "../../assets/bgbordir2.png";
import { useEffect, useState } from "react";

export default function MixMatchItem() {
  const [mixmatch, setMixes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/mixmatch")
      .then((res) => res.json())
      .then((data) => setMixes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-full overflow-hidden pb-24">
      {/* ======== ATAS: TEKS ======== */}
      <div className="relative w-full bg-pink2 pb-16">
        <div className="text-center pt-16 pb-10 px-6">
          <h1 className="text-white font-bold text-3xl mb-4 font-[Poppins]">MIX & MATCH</h1>
          <p className="text-white text-sm max-w-xl mx-auto leading-relaxed font-[Poppins] font-medium">
            Jelajahi berbagai kombinasi outfit dan temukan inspirasi gaya baru setiap hari! <br />
            Fitur Mix & Match ini membantu kamu memadupadankan produk Ourfit sesuai warna, potongan, dan gaya favoritmu.
          </p>
        </div>

        {/* ======== desktop ======== */}
        <div className="hidden md:block relative w-full flex flex-col items-center justify-center bg-cover bg-center">

          {/* GANTUNGAN di atas bordir */}
          <img src={bgGantungan} alt="Gantungan" className="relative w-full h-auto object-contain z-10" />

          {/* Kotak foto */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 flex justify-center gap-8 px-6 z-20 aspect-square">
            {mixmatch.slice(0, 3).map((item) => (
              <Link 
              key={item._id} 
              to={`/mixmatch/${item._id}`} 
              className="w-[350px] h-[350px] bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-oren1 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer">
                {item.image ? (
                  <img src={`http://localhost:5000${item.image}`} alt={item.title} className="object-cover w-full h-full rounded-lg" />
                ) : (
                  <span className="text-gray-400 font-semibold text-center leading-tight">
                    FOTO <br /> MIX & MATCH
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>


        {/* mobile */}
        <div className="md:hidden relative">

          {/* Wrapper gantungan + card */}
          <div className="relative">

            {/* Gantungan */}
            <img
              src={bgGantungan4}
              alt="Gantungan"
              className="
                w-full
                max-w-none
                relative
                z-0
              "
            />

            {/* Card Container */}
            <div
              className="
                relative
                z-10
                bg-primary
                p-10
                -mt-2
                shadow-md
              "
            >
              <div className="grid grid-cols-1 gap-6">
                {mixmatch.slice(0, 3).map((item) => (
                  <Link
                    key={item._id}
                    to={`/mixmatch/${item._id}`}
                    className="
                      bg-white
                      border-2
                      border-oren1
                      rounded-xl
                      overflow-hidden
                      aspect-square
                      shadow-md
                    "
                  >
                    {item.image ? (
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        FOTO MIX & MATCH
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ======== BORDIR ======== */}
        <div className="relative top-8">
          <img
            src={bgBordir}
            alt="Bordir"
            className="
              absolute
              left-1/2
              -bottom-32
              -translate-x-1/2
              origin-bottom
              w-[200%] sm:w-[180%] md:w-full max-w-none
              z-0
              bg-pink3
            "
          />

          {/* ======== BUTTON GLOBAL ======== */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 z-30">
            <Link
              to="/mixmatch"
              className="
                border
                border-white
                text-white
                bg-pink1
                rounded-full
                px-16 md:px-18 lg:px-20 
                py-2
                text-sm
                shadow-md
                hover:bg-white
                hover:text-pink1
                transition-all
              "
            >
              See more
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
