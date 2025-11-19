import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// === IMPORT GAMBAR ANIMASI KARAKTER ===
import karakter from "../../assets/karakter.png";
// bisa ganti .gif menjadi .png / .webp / .mp4 / apa pun sesuai kebutuhan

export default function MasukkanNama() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    if (!name.trim()) return;
    localStorage.setItem("userName", name.trim());
    navigate("/hasil-personalisasi");
  }

  function handleClose() {
    navigate("/"); // balik ke halaman utama
  }

  return (
    <div className="min-h-screen w-full bg-[#F7E3C6] flex items-center justify-center relative px-6">
      {/* Tombol X */}
      <button onClick={handleClose} className="absolute top-6 right-6 text-[#C67A3F] hover:opacity-70 transition">
        <X size={28} strokeWidth={2.5} />
      </button>

      {/* Wrapper */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ---------------------------- */}
        {/*             FORM             */}
        {/* ---------------------------- */}
        <div className="flex flex-col">
          <h1 className="text-[#C64747] font-bold text-3xl leading-tight mb-6">MASUKKAN NAMAMU DULU YA!</h1>

          <input
            type="text"
            placeholder="Nama panggilanmu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-full border border-[#E0A66F] bg-transparent text-[#C64747] placeholder-[#C88A5A] mb-6 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className={`py-4 rounded-full text-white text-lg shadow-md transition-all
              ${name.trim() ? "bg-[#C85E5A]" : "bg-[#D8A4A0] opacity-60 cursor-not-allowed"}`}
          >
            Lihat Hasil Quiz
          </button>
        </div>

        {/* ---------------------------- */}
        {/*     GAMBAR ANIMASI KARAKTER  */}
        {/* ---------------------------- */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            {/* Gambar Karakter */}
            <img src={karakter} alt="Karakter Animasi" className="w-64 h-64 object-contain rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
