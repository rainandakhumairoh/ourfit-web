import { useNavigate } from "react-router-dom";
import animasiKarakter from "../../assets/welcomingkarakter.png";

export default function SmartFitDone() {
  const navigate = useNavigate();

function handleNext() {
  const smartFit =
    sessionStorage.getItem("smartFitResult");

  if (!smartFit) {
    alert("Data Smart Fit tidak ditemukan");
    navigate("/smart-fit");
    return;
  }

  navigate("/style-quiz");
}

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT — Center vertically */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-pink1 font-bold text-2xl leading-tight mb-8 text-center md:text-left font-[Poppins]">
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
            className="w-100 h-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
