import bunga1 from "../../assets/why1.png";
import bunga2 from "../../assets/why2.png";
import bunga3 from "../../assets/why3.png";
import bunga4 from "../../assets/why4.png";
import { motion } from "framer-motion";

export default function StrengthSection() {

  return (
    <>
      {/* SECTION - Background Cream dengan Gradient */}
      <div
        className="relative w-full h-auto flex flex-col items-center justify-center pt-4 md:pt-8 lg:pt-10"
        style={{
          backgroundColor: "#FFEBC8",
        }}
      >
        {/* Title */}
        <div className="text-center py-6 md:py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C7752E] font-[Poppins] uppercase tracking-widest" 
          style={{
            textShadow: `
              -4px -4px 0 #ffffff,
              4px -4px 0 #ffffff,
              -4px  4px 0 #ffffff,
              4px  4px 0 #ffffff,
              0px -4px 0 #ffffff,
              0px  4px 0 #ffffff,
              -4px  0px 0 #ffffff,
              4px  0px 0 #ffffff
            `,
          }}>
            Why Choose Us?
          </h2>
        </div>

        {/* Flower Cards Grid */}
        <div className="w-full px-6 md:px-12 py-8 md:py-12  max-w-7xl mx-auto font-[Poppins]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 justify-items-center">
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <motion.img
                  src={bunga1}
                  alt="bunga"
                  className="w-full h-auto object-contain mb-4"
                  initial={{
                    opacity: 0,
                    rotate: -180,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                />
                <div className="text-center">
                    <p className="text-sm text-black font-light">
                    Setiap busana dirancang khusus untuk proporsi tubuh perempuan petite Indonesia agar tetap pas dan nyaman dipakai, tanpa perlu alterasi tambahan.                    </p>
                </div>
            </div>

            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <motion.img
                  src={bunga3}
                  alt="bunga"
                  className="w-full h-auto object-contain mb-4"
                  initial={{
                    opacity: 0,
                    rotate: -180,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                />
                <div className="text-center">
                    <p className="text-sm text-black font-light">
                    Koleksi warna kami disesuaikan dengan berbagai undertone kulit perempuan Indonesia, sehingga kamu bisa tampil lebih segar dan percaya diri.
                    </p>
                </div>
            </div>
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <motion.img
                  src={bunga2}
                  alt="bunga"
                  className="w-full h-auto object-contain mb-4"
                  initial={{
                    opacity: 0,
                    rotate: -180,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                />
                <div className="text-center">
                    <p className="text-sm text-black font-light">
                    Gaya minimalis yang fleksibel untuk berbagai kesempatan, dari kasual hingga semi-formal, mudah dipadu-padankan.                    </p>
                </div>
            </div>
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <motion.img
                  src={bunga4}
                  alt="bunga"
                  className="w-full h-auto object-contain mb-4"
                  initial={{
                    opacity: 0,
                    rotate: -180,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                />
                <div className="text-center">
                    <p className="text-sm text-black font-light">
                    Nikmati pengalaman belanja yang lebih personal lewat fitur Smart Fit & Style Quiz untuk menemukan ukuran dan gaya yang paling cocok dengan dirimu!
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}