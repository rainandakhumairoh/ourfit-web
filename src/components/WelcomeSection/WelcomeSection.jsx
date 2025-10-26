import bgGelombang from "../../assets/bggelombang.png";
import karakter from "../../assets/karakter.png"; // gambar karakter kamu

export default function Home() {
  return (
<>
      {/* SECTION 1 - Background cream dan gelombang */}
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center text-[#A95C18] overflow-hidden m-0 p-0"
        style={{
          backgroundImage: `url(${bgGelombang})`,
          backgroundColor: "#FFEBC8",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
    

        <h1 className="text-2xl font-bold mb-24 mt-24">
          HAI, KAMI AKAN MEMANDU KAMU <br />
          MENEMUKAN STYLE YANG PALING FIT!
        </h1>

        <img
          src={karakter}
          alt="Karakter Ourfit"
          className="w-[250px] md:w-[300px] lg:w-[350px] mb-6"
        />
        {/* SECTION 2 - Kotak merah */}
      <div className="w-full bg-[#CB5252] flex flex-col items-center justify-center py-12 px-8">
        <p className="max-w-md text-sm md:text-base text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      </div>

      
    </>
  );
}
