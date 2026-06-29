import React from "react";
import { useNavigate } from "react-router-dom";
import gunting from "../../assets/gunting.png";
import smartFit from "../../assets/smartfit.png";
import meteran from "../../assets/meteran.png";
import manekin from "../../assets/manekin.png";
import styleQuiz from "../../assets/stylequiz.png";
import benang from "../../assets/benang.png";
import bgsmartfit from "../../assets/bgsmartfit.png";
import bgstylequiz from "../..//assets/bgstylequiz2.png";
import renda2 from "../..//assets/rendashadow.png";
import karakter from "../../assets/karakternongol.png";
import { motion } from "framer-motion";


export default function PersonalizationSection() {
  const navigate = useNavigate();

 return (
    <div className="w-full overflow-hidden">
      {/* ===== BOX MERAH ATAS ===== */}
      <div className=" w-full bg-pink1 flex flex-cols-2 justify-center items-center text-center relative z-10 mb-2 px-4 pt-10">
        {/* Gambar karakter nongol */}
        <img
          src={karakter}
          alt="karakter nongol"
          className="w-40 md:w-48 lg:w-54 animate-bounce-slow"
        />

        {/* Tulisan utama */}
        <h2 className="text-white text-lg md:text-2xl font-bold mb-8 leading-snug font-[Poppins]">
          YUK, TEMUKAN GAYA DAN UKURAN TERBAIKMU!
        </h2>
      </div>

      {/* ===== SECTION 1: SMART FIT ===== */}
      <section
        className="relative z-20 w-full min-h-[700px] flex flex-col items-center justify-center bg-cover bg-center py-4 md:py-6 px-4 md:px-6"
        style={{
          backgroundImage: `url(${bgsmartfit})`,
          backgroundRepeat: "no-repeat",
          marginTop: "-100px"
        }}
      >
        {/* Gambar dekorasi */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-18 w-full mt-6 mb-6">
        <img
          src={gunting}
          alt="gunting"
          className="w-40 sm:w-48 md:w-72 lg:w-96 h-auto"
        />

        <div
          onClick={() => navigate("/smart-fit")}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <motion.img
            src={smartFit}
            alt="smart fit"
            className="w-52 sm:w-72 md:w-96 lg:w-100 h-auto"
            animate={{
              scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
        </div>

        <img
          src={meteran}
          alt="meteran"
          className="w-40 sm:w-48 md:w-72 lg:w-96 h-auto"
        />
      </div>
      </section>

      {/* ===== SECTION 2: STYLE QUIZ ===== */}
      <section
        className="relative w-full flex flex-col items-center justify-center bg-cover bg-center py-12 md:py-24 px-4 md:px-6"
        style={{
          backgroundImage: `url(${bgstylequiz})`,
          backgroundRepeat: "no-repeat",
          marginTop: "-100px"
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full py-16 mb-24">
          <img
            src={manekin}
            alt="manekin"
            className="w-40 sm:w-48 md:w-72 lg:w-96 h-auto"
          />

          <div
            onClick={() => navigate("/style-quiz")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <motion.img
              src={styleQuiz}
              alt="style quiz"
              className="w-[70vw] md:w-[85vw] lg:w-[90vw] h-auto"
              animate={{
              scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <img
            src={benang}
            alt="benang"
            className="w-40 sm:w-48 md:w-72 lg:w-96 h-auto"
          />
        </div>
      </section>
        <div className="w-full bg-primary flex flex-col items-center justify-center pb-6">
          <img 
                src={renda2} 
                alt="renda" 
                className="w-[200%] sm:w-[180%] md:w-full max-w-none"
            />
        </div>
    </div>
  );
}