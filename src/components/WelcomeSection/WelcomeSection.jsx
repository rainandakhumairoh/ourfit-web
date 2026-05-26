import bgGelombang from "../../assets/bggelombang3.png";
import karakter2 from "../../assets/welcomingkarakter2.png"; // gambar karakter kamu

export default function WelcomeSection() {
  return (
    <>
      {/* SECTION 1 - Background cream dan gelombang */}
      <div
        className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center 
        justify-center text-center text-[#A95C18] font-[Poppins]"
        style={{
          backgroundImage: `url(${bgGelombang})`,
          backgroundColor: "#FFEBC8",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-center mb-12 md:mb-24 mt-12 md:mt-24">
          HAI, KAMI OURFIT
          <br />
          PILIHAN TERBAIKMU UNTUK TAMPIL <br />
          PERCAYA DIRI SETIAP HARI!
        </h1>

        <img src={karakter2} alt="Karakter Ourfit" className="w-[200px] md:w-[350px] lg:w-[400px] scale-110 md:scale-125 lg:scale-150 mb-12 transition-transform duration-300 ease-in-out" />
        {/* SECTION 2 - Kotak merah */}
        <div className="w-full bg-[#CB5252] flex flex-col items-center justify-center py-12 px-8">
          <p className="text-white text-sm max-w-xl mx-auto text-white text-center font-light">
            Di website ini, kamu bisa menemukan berbagai koleksi outfit terbaru, fitur Smart Fit untuk bantu pilih ukuran terbaik, dan Style Quiz untuk temukan gaya yang paling cocok dengan kepribadianmu.
          </p>
        </div>
      </div>
    </>
  );
}
