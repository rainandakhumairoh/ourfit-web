import boxgelombang from "../../assets/boxgelombang.png";
import bggelombang from "../../assets/bggelombang5.png";
import fototeam from "../../assets/fototeam.png"; // gambar karakter kamu
import fototeam2 from "../../assets/fototeam2.png";
import fototeam3 from "../../assets/fototeam3.png";
import fototeam4 from "../../assets/fototeam4.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamSection() {
  const photos = [
    fototeam,
    fototeam2,
    fototeam3,
    fototeam4,
  ];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) =>
        prev === photos.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* SECTION 1 - Background cream dan gelombang */}
      <div className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden" 
      style={{ 
        backgroundColor: "#FFEBC8", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        }}>

        <div
          className="
            relative
            w-[400px]
            md:w-[550px]
            lg:w-[1000px]
            h-[200px]
            md:h-[350px]
            lg:h-[500px]
            mt-24
            md:mt-4
          "
        >
          {photos.map((photo, index) => (
            <motion.img
              key={index}
              src={photo}
              alt={`Foto Team ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              initial={false}
              animate={{
                opacity: currentPhoto === index ? 1 : 0,
                scale: currentPhoto === index ? 1 : 1.02,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* SECTION 2 - Container dengan 2 box persegi */}
        <div className="w-full relative font-[Poppins]">
                <p
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    top-10 md:top-12 lg:top-14

                    w-[90%]
                    md:w-auto
                    max-w-[400px]
                    md:max-w-xl

                    text-[10px]
                    sm:text-xs
                    md:text-base

                    leading-md
                    font-medium
                    text-white
                    text-center
                    z-40
                  "
                >
                  Di balik Ourfit, ada tim kecil yang besar dalam semangat.
                  
                  Kami percaya keanggunan sejati lahir dari ketulusan dan
                  perhatian pada detail.
                  
                  Setiap produk kami dibuat dengan cinta agar kamu selalu
                  merasa nyaman menjadi dirimu sendiri.
                </p>

                <img
                  src={boxgelombang}
                  alt="Box Gelombang"
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2

                    -top-8
                    md:-top-12
                    lg:-top-20

                    w-[380px]
                    sm:w-[400px]
                    md:w-[550px]
                    lg:w-[700px]
                    z-30
                  "
                />
          {/* Box Coklat (bagian atas - dengan dashed border) */}
          <div className="w-full bg-coklat flex flex-col items-center justify-center py-4 px-2 border-2 border-white">
            <div className="w-full flex flex-col items-center justify-center border-4 border-white"
              style={{
                borderStyle: "dashed",
              }}
            >
              <div className="w-full bg-coklat flex flex-col items-center justify-center py-4 md:py-12">
              </div>
            </div>
          </div>

          {/* Box Pink (bagian bawah - background) */}
          <div className="w-full bg-pink3 flex flex-col items-center justify-center py-6 md:py-8">
            {/* Content bisa ditambahkan di sini jika perlu */}
          </div>
          <img 
                src={bggelombang} 
                alt="Bg Gelombang" 
                className="relative w-full flex flex-col items-center justify-center text-center"
            />
        </div>
      </div>
    </>
  );
}