import bgGelombang from "../../assets/bggelombang2.png";
import karakter from "../../assets/karakter.png"; // gambar karakter kamu

export default function WelcomeSection() {
  return (
    <>
      {/* SECTION 1 - Background cream dan gelombang */}
      <div
        className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center text-[#A95C18] overflow-hidden m-0 p-0 "
        style={{
          backgroundImage: `url(${bgGelombang})`,
          backgroundColor: "#FFEBC8",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-center mb-12 md:mb-24 mt-12 md:mt-24">
          HAI, KAMI OURFIT<br />
          PILIHAN TERBAIKMU UNTUK TAMPIL <br />
          PERCAYA DIRI SETIAP HARI!
        </h1>

        <img src={karakter} alt="Karakter Ourfit" className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] mb-6 transition-transform duration-300 ease-in-out" />
        {/* SECTION 2 - Kotak merah */}
        <div className="w-full bg-[#CB5252] flex flex-col items-center justify-center py-12 px-8">
          <p className="max-w-md text-sm md:text-base text-white text-center">Di website ini, kamu bisa menemukan berbagai koleksi outfit terbaru, fitur Smart Fit untuk bantu pilih ukuran terbaik, dan Style Quiz untuk temukan gaya yang paling cocok dengan kepribadianmu.</p>
        </div>
      </div>
    </>
  );
}
