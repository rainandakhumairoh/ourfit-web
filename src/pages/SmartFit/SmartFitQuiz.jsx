import React from "react";
import { useNavigate } from "react-router-dom";

export default function SmartFitQuiz() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#FFF5E6] flex flex-col items-center justify-center px-6 py-10 relative">

      {/* Tombol close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-[#E08A7C] text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold"
      >
        ✕
      </button>

      <h1 className="text-[#C2524D] text-2xl font-bold mb-4">
        SMART FIT QUIZ
      </h1>

      <p className="text-gray-700 max-w-[400px] text-center mb-6">
        Contoh: Silakan jawab beberapa pertanyaan untuk menyesuaikan ukuran tubuhmu.
      </p>

      {/* Contoh pertanyaan */}
      <div className="w-full max-w-[400px] bg-white shadow-md p-5 rounded-xl">
        <h2 className="font-semibold text-gray-800 mb-2">1. Berapa tinggi badanmu?</h2>
        <input
          type="number"
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          placeholder="cm"
        />
      </div>

      <button
        className="mt-8 bg-[#C7544D] text-white px-10 py-3 rounded-full text-lg font-medium"
      >
        Lanjut
      </button>
    </div>
  );
}
