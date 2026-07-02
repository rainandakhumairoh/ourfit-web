import bgGelombang from "../../assets/bggelombang3.png";
import karakter2 from "../../assets/welcomingkarakter2.png";

export default function WelcomeSection() {
  return (
    <>
      <div
        className="relative w-full flex flex-col items-center 
        justify-between text-center text-coklat font-[Poppins]"
        style={{
          backgroundImage: `url(${bgGelombang})`,
          backgroundColor: "#FFEBC8",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Teks judul */}
        <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center 
          mt-28 px-2 md:px-8 
           uppercase leading-snug">
          Hai, kami OURFIT
          <br />
          Pilihan terbaikmu untuk tampil <br />
          percaya diri setiap hari!
        </h1>

        {/* Gambar karakter */}
        <div className="flex-1 flex items-end justify-center w-full mt-4 px-4">
          <img
            src={karakter2}
            alt="Karakter Ourfit"
            className="w-[320px] sm:w-[320px] md:w-[380px] lg:w-[400px] 
              object-contain
              transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* SECTION 2 - Kotak merah */}
        <div className="w-full bg-[#CB5252] flex flex-col items-center justify-center 
          py-6 sm:py-8 md:py-10 lg:py-12 
          px-4 sm:px-8 md:px-12">
          <p className="text-white text-xs sm:text-sm md:text-base 
            max-w-xs sm:max-w-sm md:max-w-xl 
            mx-auto text-center font-medium leading-relaxed">
            Di website ini, kamu bisa menemukan berbagai koleksi outfit terbaru, 
            fitur Smart Fit untuk bantu pilih ukuran terbaik, dan Style Quiz untuk 
            temukan gaya yang paling cocok dengan kepribadianmu.
          </p>
        </div>
      </div>
    </>
  );
}