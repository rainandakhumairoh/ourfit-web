import { useState, useContext } from "react";
import axios from "axios";
import cheesecakeImg from "../../assets/cheesecake.png";
import blackforestImg from "../../assets/blackforest.png";
import tiramisuImg from "../../assets/tiramisu.png";
import macaronImg from "../../assets/macarons.png";
import caramelImg from "../../assets/caramelpuding.png";
import warmImg from "../../assets/warm.png";
import coolImg from "../../assets/cool.png";
import neutralImg from "../../assets/neutral.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const styleMeta = {
  Cheesecake: {
    title: "Cheesecake Girl",
    desc: "Vibe lembut, feminin, dan kalem. Warm tone cocok dengan warna peach, cream, dan butter yellow. Cool tone cocok dengan lilac, baby pink, dan icy blue. Gaya khasmu flowy, manis, dan effortless.",
    colors: {
      WARM: ["Walnut", "Stone", "Army", "Cocoa", "Sage", "Coral Pink"],
      COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Nude", "Steel"],
      NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
    },
    img: cheesecakeImg,
  },
  Blackforest: {
    title: "Blackforest Girl",
    desc: "Vibe tegas dan elegan. Warm tone cocok dengan espresso brown, ivory, dan deep olive. Cool tone cocok dengan jet black, charcoal grey, dan midnight blue. Gaya khasmu structured dan berkarisma.",
    colors: {
      WARM: ["Walnut", "Stone", "Army", "Cocoa", "Sage", "Coral Pink"],
      COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Nude", "Steel"],
      NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
    },
    img: blackforestImg,
  },
  Tiramisu: {
    title: "Tiramisu Girl",
    desc: "Vibe natural dan hangat. Warm tone cocok dengan terracotta, sand, dan golden beige. Cool tone cocok dengan taupe, dusty mauve, dan cool beige. Gaya khasmu simple dan earthy.",
    colors: {
      WARM: ["Walnut", "Stone", "Army", "Cocoa", "Sage", "Coral Pink"],
      COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Nude", "Steel"],
      NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
    },
    img: tiramisuImg,
  },
  Macaron: {
    title: "Macaron Girl",
    desc: "Vibe ceria dan kreatif. Warm tone cocok dengan coral, sunflower yellow, dan turquoise. Cool tone cocok dengan baby blue, lavender, dan candy pink. Gaya khasmu playful dan berani tampil beda.",
    colors: {
      WARM: ["Walnut", "Stone", "Army", "Cocoa", "Sage", "Coral Pink"],
      COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Nude", "Steel"],
      NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
    },
    img: macaronImg,
  },
  "Caramel Pudding": {
    title: "Caramel Pudding Girl",
    desc: "Vibe elegan dan minimalis. Warm tone cocok dengan ivory, champagne, dan camel. Cool tone cocok dengan white, soft grey, dan blue tint. Gaya khasmu clean, tenang, dan timeless.",
    colors: {
      WARM: ["Walnut", "Stone", "Army", "Cocoa", "Sage", "Coral Pink"],
      COOL: ["Plum Dusk", "Rosewood", "Navy", "Denim", "Pink Blossom", "Nude", "Steel"],
      NEUTRAL: ["Black", "Beige", "Stone", "BW", "Nude", "Mauve"],
    },
    img: caramelImg,
  },
};

export default function PersonalizationCard({ smart, styleRes, readOnly = false }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  

  // 2. Guard null SEBELUM destructuring
  if (!styleRes || !smart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7E3C6]">
        <p className="text-gray-700 text-lg">Hasil belum lengkap. Isi Smart Fit & Style Quiz dulu ya!</p>
      </div>
    );
  }

  // 3. Destructuring SETELAH guard
  const { primary, scores, mix, versatile, undertone } = styleRes;
  const meta = styleMeta[primary] || styleMeta["Tiramisu"];
  const mixMeta = mix ? styleMeta[mix] : null;
  const finalColors = meta.colors[undertone] || meta.colors["NEUTRAL"];
  const undertoneImage =
    undertone === "WARM" ? warmImg :
    undertone === "COOL" ? coolImg :
    neutralImg;

  // Gambar
  let displayImages = [meta.img];
  if (versatile) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    displayImages = [styleMeta[entries[0][0]].img, styleMeta[entries[1][0]].img];
  } else if (mix && mixMeta) {
    displayImages = [meta.img, mixMeta.img];
  }

  // Judul
  let displayTitle = meta.title;
  if (mix && !versatile && mixMeta) {
    displayTitle = `${meta.title} dengan sentuhan ${mixMeta.title} (Mix)`;
  } else if (versatile) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    displayTitle = `${styleMeta[entries[0][0]].title} & ${styleMeta[entries[1][0]].title} (Dual Vibe)`;
  }

  // Kalimat mix/versatile
  let resultSentence = "";
  if (versatile) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    resultSentence = `Gaya kamu fleksibel! Kamu bisa mix-match antara ${styleMeta[entries[0][0]].title} dan ${styleMeta[entries[1][0]].title}.`;
  } else if (mix && mixMeta) {
    resultSentence = `Kamu ${meta.title.replace(" Girl", "")} Girl with a touch of ${mixMeta.title.replace(" Girl", "")} elegance.`;
  }

  async function handleSave() {
    if (!currentUser) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    setSaving(true);
    try {
      const userId = currentUser.id || currentUser._id;
      await axios.post("http://localhost:5000/api/personalization", {
        userId,
        primary,
        title: displayTitle,
        mix: mix ?? null,
        versatile: versatile ?? false,
        undertone,
        colors: finalColors,
        styleDesc: meta.desc,
        scores: scores ?? {},
        sizeCategory: smart.sizeCategory,
        BMI: smart.BMI,
      });
      alert("Hasil berhasil disimpan!");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert(err.response?.data?.message || "Gagal menyimpan hasil");
    } finally {
      setSaving(false);
    }
  }

  function handleClose() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
      {/* Gambar style */}
      <div className="w-full mb-3 flex flex-col items-center gap-6">
        {displayImages.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`Style ${idx + 1}`}
            className="w-full max-w-[550px] max-h-[550px] object-contain rounded-2xl"
          />
        ))}
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-semibold text-[#C85E5A] text-center mb-3">{displayTitle}</h2>

      {resultSentence && (
        <p className="text-center text-gray-700 mt-1 mb-6 text-sm max-w-xl mx-auto">
          {resultSentence}
        </p>
      )}

      <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">{meta.desc}</p>

      {/* Smart Fit */}
      <section className="mb-8">
        <h3 className="font-semibold text-[#C85E5A] text-xl mb-2">Smart Fit</h3>
        <p><b>Rekomendasi ukuran:</b> {smart.sizeCategory}</p>
        <p><b>BMI:</b> {smart.BMI}</p>
      </section>

      {/* Warna */}
      <section className="mb-8">
        <h3 className="font-semibold text-[#C85E5A] text-xl mb-3">
          Rekomendasi Warna ({undertone})
        </h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {finalColors.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border" style={{ backgroundColor: "#eee" }} />
              <span>{c}</span>
            </div>
          ))}
        </div>
        <img
          src={undertoneImage}
          alt="Tone palette"
          className="w-full max-h-[350px] object-contain rounded-lg border"
        />
      </section>

      {/* Buttons */}
        {!readOnly && (
        <div className="mt-10 flex flex-col gap-3">
            <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-full bg-pink1 hover:bg-oren2 text-white font-semibold text-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {saving ? "Menyimpan..." : "Simpan Hasil"}
            </button>
            <button onClick={handleClose} className="w-full py-3 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-semibold text-lg shadow-sm transition-all">
            Close
            </button>
        </div>
        )}
    </div>
  );
}