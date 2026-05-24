import bgGelombang from "../../assets/bggelombang3.png";
import fototeam from "../../assets/fototeam.png"; // gambar karakter kamu

export default function TeamSection() {
  return (
    <>
      {/* SECTION 1 - Background cream dan gelombang */}
      <div
        className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "#FFEBC8",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img 
          src={fototeam} 
          alt="Foto Team" 
          className="w-[400px] md:w-[550px] lg:w-[800px] mt-24" 
        />

        {/* SECTION 2 - Container dengan 2 box persegi */}
        <div className="w-full">
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
          <div className="w-full bg-pink3 flex flex-col items-center justify-center py-16 md:py-24">
            {/* Content bisa ditambahkan di sini jika perlu */}
          </div>
        </div>
      </div>
    </>
  );
}