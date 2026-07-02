import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import karakterAnimasi from "../../assets/welcomingkarakter2.png"; // GANTI dengan path gambar karakter kamu

export default function StyleQuiz() {
  const navigate = useNavigate();

function handleStart() {
  const smartFit = sessionStorage.getItem("smartFitResult");

  if (!smartFit) {
    alert("Isi Smart Fit terlebih dahulu");
    navigate("/smart-fit");
    return;
  }

  navigate("/style-quiz/question");
}

  return (
    <div className="w-full min-h-screen bg-[#F8E3C3] flex justify-center items-center px-6 relative">

      {/* Tombol close */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95"
      >
        ✕
      </button>

      {/* Box utama */}
      <div className="w-full max-w-[600px] flex flex-col items-center text-center">

        {/* Gambar karakter */}
        <img
          src={karakterAnimasi}
          alt="karakter stylequiz"
          className="w-72 h-auto object-contain"
        />

        {/* Judul */}
        <h1 className="text-pink1 text-xl md:text-2xl lg:text-2xl font-bold mt-6 font-[Poppins]">
          AYO TEMUKAN STYLE YANG <br/> COCOK DENGAN STYLE QUIZ!
        </h1>

        {/* Deskripsi */}
        <p className="text-coklat text-sm px-4 md:px-4 lg:px-6 mt-3 font-[Poppins]">
          Belum tahu gaya yang paling cocok untukmu? Yuk coba Style Quiz! Kami bantu pilih inspirasi outfit yang sesuai dengan selera dan vibe kamu.
        </p>

        {/* Tombol Start */}
        <button
          onClick={handleStart}
          className="mt-8 bg-pink1 hover:bg-oren2 text-white px-10 py-3 rounded-full text-lg font-medium w-[180px] shadow-md transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
