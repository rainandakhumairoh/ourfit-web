import bggelombang from "../../assets/bggelombang5.png";

export default function IntroductionSection() {
  return (
    <>
      {/* SECTION - Background cream dengan gelombang dan content */}
      <div
        className="relative w-full min-h-screen flex flex-col justify-start pt-6 md:pt-12 lg:pt-18"
        style={{
          backgroundColor: "#C7752E",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Content Container */}
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-6xl mx-auto font-[Poppins]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT SIDE - HEADING */}
            <div className="text-left">
              <p className="text-coklat text-lg md:text-2xl lg:text-3xl font-bold mb-2">GET TO KNOW</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink1">
                OURFIT
              </h1>
            </div>

            {/* RIGHT SIDE - TEXT CONTENT */}
            <div className="text-left space-y-6">
              {/* Paragraph 1 */}
              <p className="text-sm md:text-base text-black leading-relaxed">
                Ourfit adalah brand fashion muslimah yang petite-friendly, dirancang khusus untuk kamu yang sering kesulitan cari baju yang pas di badan.
              </p>

              {/* Paragraph 2 */}
              <p className="text-sm md:text-base text-black leading-relaxed">
                Dengan potongan yang disesuaikan proporsi tubuh wanita Indonesia, Ourfit menghadirkan pakaian yang nyaman, pas di badan, dan bikin pancaya diri ke mana pun kamu pergi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}