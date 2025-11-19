import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HasilPersonalisasi() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [smart, setSmart] = useState(null);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const nm = sessionStorage.getItem("userName");
    const sf = sessionStorage.getItem("smartFitResult");
    const st = sessionStorage.getItem("styleQuizResult");

    if (nm) setName(nm);
    if (sf) setSmart(JSON.parse(sf));
    if (st) setStyle(JSON.parse(st));
  }, []);

  const styleRekom = {
    "Luna Girl": {
      warna: ["Baby Pink", "Rose", "Lilac"],
      outfit: ["Blouse flowy", "Pleated skirt", "Cardigan lembut"],
      produk: ["Luna Blouse", "Soft Pleats Skirt", "Ribbon Cardigan"],
    },
    "Noir Girl": {
      warna: ["Hitam", "Charcoal", "Navy"],
      outfit: ["Blazer fit", "Straight pants", "Turtleneck"],
      produk: ["Noir Blazer", "Essential Pants", "Classy Knit Top"],
    },
    "Terra Girl": {
      warna: ["Olive", "Beige", "Cokelat"],
      outfit: ["Overshirt earth tone", "Loose pants", "Casual Tee"],
      produk: ["Terra Shirt", "Relaxed Pants", "Daily Tee"],
    },
    "Astra Girl": {
      warna: ["Coral", "Sky Blue", "Sunshine Yellow"],
      outfit: ["Sweater colorful", "Wide pants", "Cute top"],
      produk: ["Astra Sweater", "Joy Pants", "Bright Top"],
    },
    "Velvet Girl": {
      warna: ["Ivory", "Champagne", "Light Grey"],
      outfit: ["Minimal blouse", "Straight skirt", "Soft knit"],
      produk: ["Velvet Blouse", "Flow Skirt", "Calm Knit"],
    },
  };

  if (!smart || !style)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7E3C6] px-6">
        <p className="text-gray-700 text-lg text-center">
          Hasil belum lengkap. Silakan isi Smart Fit & Style Quiz dulu.
        </p>
      </div>
    );

  const rec = styleRekom[style.type];

  function handleDownload() {
    window.print();
  }

  function handleClose() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#F7E3C6] px-6 py-10">
      <h1 className="text-[#C64747] text-3xl font-bold text-center">
        Hai, {name}! ✨
      </h1>
      <p className="text-center text-gray-700 mt-2 mb-8">
        Ini hasil personalisasi lengkap untuk kamu.
      </p>

      {/* CARD RESULT */}
      <div
        id="hasilCard"
        className="max-w-lg mx-auto bg-white rounded-2xl shadow p-6 space-y-8"
      >
        {/* SMART FIT */}
        <section>
          <h2 className="text-xl font-bold text-[#C85E5A] mb-2">Smart Fit</h2>
          <p className="text-gray-700 mb-1">
            <strong>Rekomendasi ukuran:</strong> {smart.sizeCategory}
          </p>
          <p className="text-gray-700">
            <strong>BMI:</strong> {smart.BMI}
          </p>
        </section>

        {/* STYLE */}
        <section>
          <h2 className="text-xl font-bold text-[#C85E5A] mb-2">
            Style Persona
          </h2>
          <p className="text-gray-700 mb-3">
            Kamu adalah: <strong>{style.type}</strong>
          </p>

          <div className="space-y-3">
            <div>
              <p className="font-semibold text-gray-700">Warna cocok kamu:</p>
              <ul className="list-disc ml-6 text-gray-700">
                {rec.warna.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Gaya outfit cocok:</p>
              <ul className="list-disc ml-6 text-gray-700">
                {rec.outfit.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Rekomendasi produk:</p>
              <ul className="list-disc ml-6 text-gray-700">
                {rec.produk.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BUTTON DOWNLOAD */}
        <button
          onClick={handleDownload}
          className="w-full py-3 mt-4 rounded-full bg-[#C85E5A] text-white font-semibold text-lg"
        >
          Unduh Hasil Personalisasi
        </button>
      </div>

       {/* CLOSE BUTTON */}
      <button
        onClick={() => {
          sessionStorage.removeItem("styleQuizTemp");
          sessionStorage.removeItem("styleQuizResult");
          navigate("/");
        }}
        className="absolute top-5 right-5 text-[#C75E58] text-2xl font-bold"
      >
        ×
      </button>
    </div>
  );
}
