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

function LoginPopup({ onClose, onLogin }) {
  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl px-8 py-8 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[popIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>

        {/* Teks */}
        <div className="text-center font-[Poppins]">
          <h3 className="text-lg font-bold text-gray-800">Login Dulu, Yuk!</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Kamu perlu login untuk menyimpan dan melihat hasil personalisasi kamu.
          </p>
        </div>

        {/* Tombol Login */}
        <button
          onClick={onLogin}
          className="w-full py-2.5 bg-pink1 hover:bg-pink2 text-white font-medium rounded-full transition-colors text-sm"
        >
          Login Sekarang
        </button>

        {/* Batalkan */}
        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Nanti saja
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function PersonalizationCard({ smart, styleRes, readOnly = false }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  

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
      setShowLoginPopup(true);
      return;
    }

    setSaving(true);

    try {
      const userId = currentUser.id || currentUser._id;

      await axios.post("http://localhost:5000/api/personalization", {
        userId,
        name: sessionStorage.getItem("userName"),

        smartFit: {
          BMI: smart.BMI,
          sizeCategory: smart.sizeCategory,
        },

        styleQuiz: {
          primary,
          mix,
          versatile,
          undertone,
          scores,
        },
      });

      alert("Hasil berhasil disimpan!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menyimpan hasil");
    } finally {
      setSaving(false);
    }
  }


  function handleClose() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleLogin() {
    sessionStorage.setItem(
      "redirectAfterLogin",
      "/hasil-personalisasi"
    );

    navigate("/login-user");
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
      <h2 className="text-2xl font-semibold text-pink1 text-center font-[Poppins] mb-3">{displayTitle}</h2>

      {resultSentence && (
        <p className="text-center text-gray-700 mt-1 mb-6 max-w-xl mx-auto font-[Poppins]">
          {resultSentence}
        </p>
      )}

      <p className="text-gray-700 text-center text-lg max-w-4xl mx-auto mb-8">{meta.desc}</p>

      {/* Smart Fit */}
      <section className="mb-8 font-[Poppins]">
        <h3 className="font-semibold text-pink1 text-xl mb-2">Smart Fit</h3>
        <p><b>Rekomendasi ukuran:</b> {smart.sizeCategory}</p>
        <p><b>BMI:</b> {smart.BMI}</p>
      </section>

      {/* Warna */}
      <section className="mb-8 font-[Poppins]">
        <h3 className="font-semibold text-pink1 text-xl mb-3">
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
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-full bg-pink1 hover:bg-oren2 text-white font-medium text-lg transition-all disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Result"}
          </button>
          <button onClick={handleClose} 
          className="w-full py-3 rounded-full bg-gray-400 hover:bg-gray-300 text-white font-medium text-lg transition-all"> 
            Close 
          </button>
        </div>
        )}

        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onLogin={handleLogin}
          />
        )}
    </div>
  );
}