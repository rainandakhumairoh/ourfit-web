import { useNavigate } from "react-router-dom";

export default function SmartFitDone() {
  const navigate = useNavigate();

  function handleNext() {
    navigate("/style-quiz"); 
  }

  return (
    <div className="min-h-screen bg-[#F8E7C7] flex flex-col items-center justify-center px-6">
      {/* Text */}
      <h1 className="text-[#C24E4E] text-center font-bold text-2xl mb-8">
        SELESAI! YUK LANJUT TEMUKAN STYLE-MU!
      </h1>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full max-w-md bg-[#C24E4E] text-white py-3 rounded-full text-center text-lg shadow-md hover:bg-[#a44040] transition"
      >
        Next
      </button>

      {/* Character Illustration */}
      <div className="mt-12 flex flex-col items-center">
        <div className="w-56 h-56 bg-gray-400 rounded-full flex items-center justify-center text-white text-center">
          ANIMASI<br/>KARAKTER
        </div>

        <div className="w-72 h-10 bg-black/60 rounded-full mt-3"></div>
      </div>
    </div>
  );
}
