import React from "react";
import { useNavigate } from "react-router-dom";
import gunting from "../../assets/gunting.png";
import smartFit from "../../assets/smartfit.png";
import meteran from "../../assets/meteran.png";
import manekin from "../../assets/manekin.png";
import styleQuiz from "../../assets/stylequiz.png";
import benang from "../../assets/benang.png";
import bgsmartfit from "../../assets/bgsmartfit.png";
import bgstylequiz from "../..//assets/bgstylequiz.png";
import karakter from "../../assets/karakter.png";

export default function PersonalizationSection() {
  const navigate = useNavigate();

//    return (
//     <div className="w-full">
//       {/* ===== BOX MERAH ATAS ===== */}
//       <div className="w-full bg-pink1 flex flex-col md:flex-row justify-center items-center text-center py-12 px-6">
//         {/* Gambar karakter nongol */}
//         <img
//           src={karakter}
//           alt="karakter nongol"
//           className="w-32 md:w-48 h-auto mb-6 md:mb-0 md:mr-8"
//         />

//         {/* Tulisan utama */}
//         <h2 className="text-white text-lg md:text-2xl font-bold max-w-[600px] leading-snug">
//           YUK, TEMUKAN GAYA DAN UKURAN TERBAIKMU!
//         </h2>
//       </div>

//       {/* ===== SECTION 1: SMART FIT ===== */}
//       <section
//         className="relative w-full flex flex-col items-center justify-center bg-cover bg-center py-16 px-6"
//         style={{ backgroundImage: `url(${bgsmartfit})` }}
//       >

//         {/* Gambar dekorasi */}
//         <div className="flex flex-wrap justify-between items-center gap-18 w-full mt-6 mb-6">
//           <img src={gunting} alt="gunting" className="w-80 md:w-96 h-auto" />

//           {/* Gambar mesin jahit (klik) */}
//           <div
//             onClick={() => navigate("/smart-fit")}
//             className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
//           >
//             <img src={smartFit} alt="mesin jahit" className="w-80 md:w-96 h-auto" />
//           </div>

//           <img src={meteran} alt="pita meter" className="w-80 md:w-96 h-auto" />
//         </div>
//       </section>

//       {/* ===== SECTION 2: STYLE QUIZ ===== */}
//       <section
//         className="relative w-full flex flex-col items-center justify-center bg-cover bg-center min-h-[800px] md:min-h-[900px] py-16 px-6"
//         style={{ backgroundImage: `url(${bgstylequiz})` }}
//       >
//         {/* Gambar dekorasi */}
//         <div className="flex flex-wrap justify-between items-center gap-18 w-full mt-6">
//           <img src={manekin} alt="manekin" className="w-80 md:w-96 h-auto" />

//           {/* Gambar hati (klik) */}
//           <div
//             onClick={() => navigate("/style-quiz")}
//             className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
//           >
//             <img src={styleQuiz} alt="hati jarum" className="w-80 md:w-96 h-auto" />
//           </div>

//           <img src={benang} alt="benang" className="w-80 md:w-96 h-auto" />
//         </div>
//       </section>
//     </div>
//   );
// }

 return (
    <div className="w-full overflow-hidden">
      {/* ===== BOX MERAH ATAS ===== */}
      <div className=" w-full bg-pink1 flex flex-col md:flex-row justify-center items-center text-center py-24 px-6 relative z-10">
        {/* Gambar karakter nongol */}
        <img
          src={karakter}
          alt="karakter nongol"
          className="w-32 md:w-48 h-auto mb-6 md:mb-0 md:mr-8 animate-bounce-slow"
        />

        {/* Tulisan utama */}
        <h2 className="text-white text-lg md:text-2xl font-bold max-w-[600px] leading-snug">
          YUK, TEMUKAN GAYA DAN UKURAN TERBAIKMU!
        </h2>
      </div>

      {/* ===== SECTION 1: SMART FIT ===== */}
      <section
        className="relative z-20 w-full flex flex-col items-center justify-center bg-cover bg-center py-16 px-6"
        style={{
          backgroundImage: `url(${bgsmartfit})`,
          backgroundRepeat: "no-repeat",
          marginTop: "-100px"
        }}
      >
        {/* Gambar dekorasi */}
        <div className="flex justify-between items-center gap-18 w-full mt-6 mb-6 ">
          <img src={gunting} alt="gunting" className="w-80 md:w-96 h-auto object-contain" />

          {/* Gambar mesin jahit (klik) */}
          <div
            onClick={() => navigate("/smart-fit")}
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          >
            <img src={smartFit} alt="mesin jahit" className="w-80 md:w-96 h-auto" />
          </div>

          <img src={meteran} alt="pita meter" className="w-80 md:w-96 h-auto object-contain" />
        </div>
      </section>

      {/* ===== SECTION 2: STYLE QUIZ ===== */}
      <section
        className="relative w-full flex flex-col items-center justify-center bg-cover bg-center min-h-[800px] md:min-h-[900px] py-16 px-6 "
        style={{
          backgroundImage: `url(${bgstylequiz})`,
          backgroundRepeat: "no-repeat",
          marginTop: "-100px"
        }}
      >
        <div className="flex justify-between items-center gap-18 w-full mt-6 mb-6">
          <img
            src={manekin}
            alt="manekin"
            className="w-80 md:w-96 h-auto object-contain"
          />

          {/* Gambar hati (klik) */}
          <div
            onClick={() => navigate("/style-quiz")}
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={styleQuiz}
              alt="hati jarum"
              className="w-90 md:w-120 h-auto"
            />
          </div>

          <img
            src={benang}
            alt="benang"
            className="w-80 md:w-96 h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
}