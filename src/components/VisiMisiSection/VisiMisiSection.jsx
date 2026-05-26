import karakter from "../../assets/welcomingkarakter.png";

export default function VisiMisiSection() {
  return (
    <>
      {/* SECTION - Background coklat dengan border dashed */}
      <div
        className="relative w-full min-h-auto flex flex-col justify-center"
        style={{
          backgroundColor: "#C7752E",
        }}
      >
        {/* Outer Border Container */}
        <div className="w-full flex flex-col items-center justify-center px-4 py-8">
          {/* Dashed Border */}
          <div
            className="w-full border-4 border-white"
            style={{
              borderStyle: "dashed",
              borderRadius: "8px",
            }}
          >
            {/* Inner Content */}
            <div className="w-full bg-transparent flex flex-col items-center justify-center py-8 md:py-10 px-4 md:px-8">
              {/* Main Grid Container */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                
                {/* LEFT SIDE - CHARACTER IMAGE */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <div className="w-[400px] md:w-[500px] lg:w-700px] h-auto">
                      <img 
                        src={karakter} 
                        alt="karakter" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - VISI & MISI CONTENT */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* VISI SECTION */}
                  <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-coklat mb-4 font-[Poppins] uppercase tracking-wide">
                      VISI
                    </h2>
                    <p className="text-sm md:text-base text-black leading-relaxed font-[Poppins] font-medium text-justify">
                      Menjadi brand fashion muslimah petite terpercaya yang inovatif dalam menghadirkan busana modern, nyaman, mudah dipadu-padankan dan dapat dipersonalisasi.
                    </p>
                  </div>

                  {/* MISI SECTION */}
                  <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-coklat mb-6 font-[Poppins] uppercase tracking-wide">
                      MISI
                    </h2>
                    
                    <ol className="space-y-4">
                      {/* Misi Item 1 */}
                      <li className="flex gap-4 text-justify">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coklat text-white flex items-center justify-center text-sm font-bold font-[Poppins]">
                          1
                        </span>
                        <p className="text-sm md:text-base text-black leading-relaxed font-[Poppins] font-medium pt-0.5">
                          Menghadirkan koleksi busana muslimah petite yang modern, nyaman, dan mudah dipadu-padankan.
                        </p>
                      </li>

                      {/* Misi Item 2 */}
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coklat text-white flex items-center justify-center text-sm font-bold font-[Poppins]">
                          2
                        </span>
                        <p className="text-sm md:text-base text-black leading-relaxed font-[Poppins] font-medium pt-0.5">
                          Menyediakan fitur personalisasi di website, mulai dari fit sizing hingga mix & match sesuai undertone.
                        </p>
                      </li>

                      {/* Misi Item 3 */}
                      <li className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coklat text-white flex items-center justify-center text-sm font-bold font-[Poppins]">
                          3
                        </span>
                        <p className="text-sm md:text-base text-black leading-relaxed font-[Poppins] font-medium pt-0.5">
                          Membangun brand terpercaya melalui desain inovatif yang relevan dengan kebutuhan muslimah petite.
                        </p>
                      </li>
                    </ol>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}