import bunga1 from "../../assets/why1.png";
import bunga2 from "../../assets/why2.png";
import bunga3 from "../../assets/why3.png";
import bunga4 from "../../assets/why4.png";
import renda from "../../assets/renda.png";

export default function StrengthSection() {

  return (
    <>
      {/* SECTION - Background Cream dengan Gradient */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center pt-8 md:pt-16"
        style={{
          backgroundColor: "#FFEBC8",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-coklat font-[Poppins] uppercase tracking-widest">
            Why Choose Us?
          </h2>
        </div>

        {/* Flower Cards Grid */}
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto font-[Poppins]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 justify-items-center">
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <img 
                src={bunga1} 
                alt="bunga" 
                className="w-full h-auto object-contain mb-4"
                />
                <div className="text-center">
                    <p className="text-xs md:text-sm text-black font-light">
                    Setiap busana dirancang khusus untuk proporsi tubuh perempuan petite Indonesia agar tetap pas dan nyaman dipakai, tanpa perlu alterasi tambahan.                    </p>
                </div>
            </div>

            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <img 
                src={bunga3} 
                alt="bunga" 
                className="w-full h-auto object-contain mb-4"
                />
                <div className="text-center">
                    <p className="text-xs md:text-sm text-black font-light">
                    Koleksi warna kami disesuaikan dengan berbagai undertone kulit perempuan Indonesia, sehingga kamu bisa tampil lebih segar dan percaya diri.
                    </p>
                </div>
            </div>
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <img 
                src={bunga2} 
                alt="bunga" 
                className="w-full h-auto object-contain mb-4"
                />
                <div className="text-center">
                    <p className="text-xs md:text-sm text-black font-light">
                    Gaya minimalis yang fleksibel untuk berbagai kesempatan, dari kasual hingga semi-formal, mudah dipadu-padankan.                    </p>
                </div>
            </div>
            <div className="w-[150px] md:w-[250px] lg:w-400px] h-auto">
                <img 
                src={bunga4} 
                alt="bunga" 
                className="w-full h-auto object-contain mb-4"
                />
                <div className="text-center">
                    <p className="text-xs md:text-sm text-black font-light">
                    Nikmati pengalaman belanja yang lebih personal lewat fitur Smart Fit & Style Quiz untuk menemukan ukuran dan gaya yang paling cocok dengan dirimu!
                    </p>
                </div>
            </div>
          </div>
        </div>
          <div className="w-full bg-primary flex flex-col items-center justify-center mt-8 md:mt-16">
            {/* Content bisa ditambahkan di sini jika perlu */}
            <img 
                    src={renda} 
                    alt="renda" 
                    className="relative w-full flex flex-col items-center justify-center text-center"
                />
          </div>

      </div>
    </>
  );
}