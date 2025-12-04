import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

// placeholder image imports — ganti file sesuai asetmu
import cheesecakeImg from "../../assets/cheesecake.png";
import blackforestImg from "../../assets/blackforest.png";
import tiramisuImg from "../../assets/tiramisu.png";
import macaronImg from "../../assets/macarons.png";
import caramelImg from "../../assets/caramelpuding.png";

import warmImg from "../../assets/warm.png";
import coolImg from "../../assets/cool.png";
import neutralImg from "../../assets/neutral.png";

export default function HasilPersonalisasi() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [smart, setSmart] = useState(null);
  const [styleRes, setStyleRes] = useState(null);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const nm = sessionStorage.getItem("userName");
    const sf = sessionStorage.getItem("smartFitResult");
    const st = sessionStorage.getItem("styleQuizResult");

    if (nm) setName(nm);
    if (sf) setSmart(JSON.parse(sf));
    if (st) setStyleRes(JSON.parse(st));

    setPageUrl(window.location.href);
  }, []);

const styleMeta = {
    Cheesecake: {
      title: "Cheesecake Girl",
      desc: " Vibe lembut, feminin, dan kalem. Warm tone cocok dengan warna peach, cream, dan butter yellow. Cool tone cocok dengan lilac, baby pink, dan icy blue. Gaya khasmu flowy, manis, dan effortless.",
      colors: {
        WARM: ["Walnut", "Stone", "Army", "Cocoa","Sage", "Coral Pink"],
        COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Plum Dusk", "Nude", "Steel"],
        NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
      },
      img: cheesecakeImg,
    },
    Blackforest: {
      title: "Blackforest Girl",
      desc: " Vibe tegas dan elegan. Warm tone cocok dengan espresso brown, ivory, dan deep olive. Cool tone cocok dengan jet black, charcoal grey, dan midnight blue. Gaya khasmu structured dan berkarisma.",
      colors: {
        WARM: ["Walnut", "Stone", "Army", "Cocoa","Sage", "Coral Pink"],
        COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Plum Dusk", "Nude", "Steel"],
        NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
      },
      img: blackforestImg,
    },
    Tiramisu: {
      title: "Tiramisu Girl",
      desc: " Vibe natural dan hangat. Warm tone cocok dengan terracotta, sand, dan golden beige. Cool tone cocok dengan taupe, dusty mauve, dan cool beige. Gaya khasmu simple dan earthy.",
      colors: {
        WARM: ["Walnut", "Stone", "Army", "Cocoa","Sage", "Coral Pink"],
        COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Plum Dusk", "Nude", "Steel"],
        NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
      },
      img: tiramisuImg,
    },
    Macaron: {
      title: "Macaron Girl",
      desc: " Vibe ceria dan kreatif. Warm tone cocok dengan coral, sunflower yellow, dan turquoise. Cool tone cocok dengan baby blue, lavender, dan candy pink. Gaya khasmu playful dan berani tampil beda.",
      colors: {
        WARM: ["Walnut", "Stone", "Army", "Cocoa","Sage", "Coral Pink"],
        COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Plum Dusk", "Nude", "Steel"],
        NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
      },
      img: macaronImg,
    },
    "Caramel Pudding": {
      title: "Caramel Pudding Girl",
      desc: " Vibe elegan dan minimalis. Warm tone cocok dengan ivory, champagne, dan camel. Cool tone cocok dengan white, soft grey, dan blue tint. Gaya khasmu clean, tenang, dan timeless.",
      colors: {
        WARM: ["Walnut", "Stone", "Army", "Cocoa","Sage", "Coral Pink"],
        COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Plum Dusk", "Nude", "Steel"],
        NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
      },
      img: caramelImg,
    },
  };

  const undertoneImage = styleRes?.undertone === "WARM" ? warmImg : styleRes?.undertone === "COOL" ? coolImg : neutralImg;

  if (!styleRes || !smart)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7E3C6]">
        <p className="text-gray-700 text-lg">Hasil belum lengkap. Isi Smart Fit & Style Quiz dulu ya!</p>
      </div>
    );

  const { primary, scores, mix, versatile, undertone } = styleRes;

  const meta = styleMeta[primary] || styleMeta["Tiramisu"];
  const mixMeta = mix ? styleMeta[mix] : null;

  let displayTitle = meta.title;
  if (mix && !versatile) {
    displayTitle = `${meta.title} with a touch of ${mixMeta.title}`;
  } else if (versatile) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = styleMeta[entries[0][0]].title;
    const second = styleMeta[entries[1][0]].title;
    displayTitle = `${top} & ${second} (Versatile)`;
  }

  const finalColors = meta.colors[undertone] || meta.colors["NEUTRAL"];

  function handleDownload() {
    window.print();
  }

  function handleClose() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#F7E3C6] px-6 py-10 relative">
      {/* CLOSE BUTTON */}
      <button onClick={handleClose} className="absolute top-5 right-5 text-[#C75E58] text-3xl font-bold">
        ×
      </button>

      <h1 className="text-[#C64747] text-3xl font-bold text-center">Hai, {name}! ✨</h1>
      <p className="text-center text-gray-700 mt-1 mb-8">Ini hasil personalisasi lengkap untukmu.</p>

      {/* == 1 CARD BESAR == */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        {/* GAMBAR STYLE */}
        <div className="w-full mb-10 flex justify-center">
          <img src={meta.img} alt={meta.title} className="w-full max-h-[550px] object-contain rounded-2xl" />
        </div>

        {/* JUDUL */}
        <h2 className="text-2xl font-semibold text-[#C85E5A] text-center mb-3">{displayTitle}</h2>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">{meta.desc}</p>

        {/* SMART FIT */}
        <section className="mb-8">
          <h3 className="font-semibold text-[#C85E5A] text-xl mb-2">Smart Fit</h3>
          <p>
            <b>Rekomendasi ukuran:</b> {smart.sizeCategory}
          </p>
          <p>
            <b>BMI:</b> {smart.BMI}
          </p>
        </section>

        {/* WARNA */}
        <section className="mb-8">
          <h3 className="font-semibold text-[#C85E5A] text-xl mb-3">Rekomendasi Warna ({undertone})</h3>

          <div className="flex flex-wrap gap-4 mb-6">
            {finalColors.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border" style={{ backgroundColor: "#eee" }}></div>
                <span>{c}</span>
              </div>
            ))}
          </div>

          <img src={undertoneImage} alt="Tone palette" className="w-full max-h-[350px] object-contain rounded-lg border" />
        </section>

        {/* QR CODE */}
        {/* <div className="flex flex-col items-center mt-10">
          <p className="font-medium text-gray-700 mb-2">Scan untuk menyimpan hasil:</p>
          <QRCodeCanvas value={pageUrl} size={180} bgColor="#ffffff" />
        </div> */}

        {/* BUTTONS */}
        <div className="mt-10">
          {/* <button
            onClick={handleDownload}
            className="w-full py-3 rounded-full bg-oren2 text-white font-semibold text-lg mb-3"
          >
            Unduh Hasil Personalisasi
          </button> */}

          <button onClick={handleClose} className="w-full py-3 rounded-full bg-[#C85E5A] text-white font-semibold text-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
