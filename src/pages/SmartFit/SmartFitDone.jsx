import { useNavigate } from "react-router-dom";
import animasiKarakter from "../../assets/welcomingkarakter.png";

export default function SmartFitDone() {
  const navigate = useNavigate();

  function handleNext() {
    navigate("/style-quiz");
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT — Center vertically */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-[#C24E4E] font-bold text-2xl leading-tight mb-8 text-center md:text-left">
            SELESAI! YUK LANJUT <br /> TEMUKAN STYLE-MU!
          </h1>

          <button
            onClick={handleNext}
            className="w-full bg-pink1 text-white py-3 rounded-full text-lg shadow-md hover:bg-oren2 transition"
          >
            Next
          </button>
        </div>

        {/* RIGHT — Character Image */}
        <div className="flex flex-col items-center">
          <img
            src={animasiKarakter}
            alt="Animasi Karakter"
            className="w-60 h-60 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
