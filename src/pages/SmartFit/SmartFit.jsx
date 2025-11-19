import React from "react";
import { useNavigate } from "react-router-dom";
import karakterAnimasi from "../../assets/karakter.png"; // GANTI dengan path gambar karakter kamu

export default function SmartFit() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#F8E3C3] flex justify-center items-center px-6 relative">

      {/* Tombol close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95"
      >
        ✕
      </button>

      {/* Box utama */}
      <div className="w-full max-w-[600px] flex flex-col items-center text-center">

        {/* Gambar karakter */}
        <img
          src={karakterAnimasi}
          alt="karakter smartfit"
          className="w-72 h-auto object-contain"
        />

        {/* Judul */}
        <h1 className="text-pink1 text-2xl font-bold mt-6">
          AYO TEMUKAN UKURAN YANG <br/> FIT DENGAN SMART FIT!
        </h1>

        {/* Deskripsi */}
        <p className="text-coklat text-sm max-w-[350px] mt-3">
          Siap cari ukuran paling pas? Yuk jawab beberapa pertanyaan cepat biar kami bantu temukan size outfitmu dalam hitungan detik!
        </p>

        {/* Tombol Start */}
        <button
          onClick={() => navigate("/smart-fit/question")}
          className="mt-8 bg-pink1 hover:bg-oren2 text-white px-10 py-3 rounded-full text-lg font-medium w-[180px] shadow-md transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
