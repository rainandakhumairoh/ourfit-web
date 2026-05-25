import boxgelombang from "../../assets/boxgelombang.png";
import bggelombang from "../../assets/bggelombang5.png";
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
          className="w-[400px] md:w-[550px] lg:w-[900px] mt-24" 
        />

        {/* SECTION 2 - Container dengan 2 box persegi */}
        <div className="w-full relative font-[Poppins]">
                <p className="absolute left-1/2 transform -translate-x-1/2 top-8 md:top-12 lg:top-14 max-w-xl text-sm md:text-base font-medium text-white text-center z-40">
                    Di balik Ourfit, ada tim kecil yang besar dalam semangat. <br />
                    Kami percaya keanggunan sejati lahir dari ketulusan dan perhatian pada detail.
                    Setiap produk kami dibuat dengan cinta agar kamu selalu <br />merasa nyaman menjadi dirimu sendiri.
                </p>
            <img 
                src={boxgelombang} 
                alt="Box Gelombang" 
                className="absolute left-1/2 transform -translate-x-1/2 -top-6 md:-top-12 lg:-top-20 w-[250px] md:w-[400px] lg:w-[700px] z-30"
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