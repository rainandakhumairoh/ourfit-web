import bggelombang from "../../assets/bggelombang5.png";

export default function IntroductionSection() {
  return (
    <>
      {/* SECTION - Background cream dengan gelombang dan content */}
      <div
        className="relative w-full min-h-fit flex flex-col justify-start"
        style={{
          backgroundColor: "#FFEBC8",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Content Container */}
        <div className="w-full px-6 md:px-12 lg:px-6 max-w-6xl mx-auto font-[Poppins] py-12 md:py-32 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT SIDE - HEADING */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#C7752E] font-[Poppins] uppercase tracking-widest mb-2" 
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
            GET TO KNOW</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-pink1" 
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
                OURFIT
              </h1>
            </div>

            {/* RIGHT SIDE - TEXT CONTENT */}
            <div className="text-left space-y-6 mb text-justify font-medium">
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