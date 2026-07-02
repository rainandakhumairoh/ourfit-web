import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * StyleQuizQuestion.jsx
 * - sessionStorage untuk menyimpan sementara
 * - scoring sesuai brief Ourfit Style Quiz
 * - menyimpan undertone (WARM/COOL/NEUTRAL)
 */

export default function StyleQuizQuestion() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      id: "warnaOutfit",
      question: "Warna apa yang paling sering kamu pilih untuk outfit sehari-hari?",
      options: [
        "Baby pink, cream, lilac", // A
        "Hitam, abu-abu, dark brown", // B
        "Beige, olive, cokelat muda", // C
        "Biru langit, kuning, coral", // D
        "Putih, ivory, abu muda", // E
      ],
    },
    {
      id: "undertone",
      question:
        "Warna kulit kamu cenderung punya undertone seperti apa?",
      options: [
        "Cool tone — sedikit pink atau keunguan, cocok dengan perhiasan silver", // A
        "Warm tone — kekuningan atau keemasan, cocok dengan perhiasan gold", // B
        "Neutral tone — di tengah-tengah, cocok dengan keduanya", // C
      ],
    },
    {
      id: "acara",
      question: "Biasanya kamu pakai baju untuk acara apa?",
      options: [
        "Hangout santai atau ngopi", // A
        "Event formal atau meeting", // B
        "Jalan-jalan atau traveling", // C
        "Kumpul bareng teman atau festival", // D
        "Acara kampus atau kantor", // E
      ],
    },
    {
      id: "gayaFavorit",
      question: "Gaya favorit kamu seperti apa?",
      options: [
        "Feminine dan manis", // A
        "Chic dan classy", // B
        "Simple dan nyaman", // C
        "Fun dan berwarna", // D
        "Minimalist dan rapi", // E
      ],
    },
    {
      id: "kataKamu",
      question: "Pilih kata yang paling menggambarkan kamu.",
      options: ["Dreamy", "Confident", "Grounded", "Playful", "Calm"], // A B C D E
    },
  ];

  // initial answers + undertone stored separately
  const [answers, setAnswers] = useState({
    warnaOutfit: "",
    undertone: "", // value: "COOL"|"WARM"|"NEUTRAL"
    acara: "",
    gayaFavorit: "",
    kataKamu: "",
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("styleQuizTemp");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  function saveTemp(updated) {
    sessionStorage.setItem("styleQuizTemp", JSON.stringify(updated));
  }

  function handleSelect(questionId, value) {
    // for undertone question we map to COOL/WARM/NEUTRAL
    const updated = { ...answers };
    if (questionId === "undertone") {
      const mapped =
        value.startsWith("Cool") ? "COOL" : value.startsWith("Warm") ? "WARM" : "NEUTRAL";
      updated[questionId] = mapped;
    } else {
      updated[questionId] = value;
    }
    setAnswers(updated);
    saveTemp(updated);
  }

  function isAnswered(q) {
    // undertone considered answered if answers.undertone set
    return answers[q.id] && answers[q.id] !== "";
  }


  // ============================
  // SCORING RULES (dari brief)
  // ============================
  function calculateStyleResult(a) {
    // styles keys: Cheesecake, Blackforest, Tiramisu, Macaron, Caramel
    const scores = {
      Cheesecake: 0,
      Blackforest: 0,
      Tiramisu: 0,
      Macaron: 0,
      "Caramel Pudding": 0,
    };

    // P1: warnaOutfit
    switch (a.warnaOutfit) {
      case "Baby pink, cream, lilac":
        scores.Cheesecake += 3;
        scores.Macaron += 1;
        break;
      case "Hitam, abu-abu, dark brown":
        scores.Blackforest += 3;
        scores["Caramel Pudding"] += 1;
        break;
      case "Beige, olive, cokelat muda":
        scores.Tiramisu += 3;
        scores["Caramel Pudding"] += 1;
        break;
      case "Biru langit, kuning, coral":
        scores.Macaron += 3;
        scores.Cheesecake += 1;
        break;
      case "Putih, ivory, abu muda":
        scores["Caramel Pudding"] += 3;
        scores.Tiramisu += 1;
        break;
      default:
        break;
    }

    // P2: undertone -> just saved separately (no score)
    // a. stored as "COOL"/"WARM"/"NEUTRAL"

    // P3: acara
    switch (a.acara) {
      case "Hangout santai atau ngopi":
        scores.Cheesecake += 2;
        scores.Tiramisu += 2;
        break;
      case "Event formal atau meeting":
        scores.Blackforest += 3;
        scores["Caramel Pudding"] += 2;
        break;
      case "Jalan-jalan atau traveling":
        scores.Tiramisu += 3;
        scores.Macaron += 1;
        break;
      case "Kumpul bareng teman atau festival":
        scores.Macaron += 3;
        scores.Cheesecake += 1;
        break;
      case "Acara kampus atau kantor":
        scores["Caramel Pudding"] += 3;
        scores.Blackforest += 1;
        break;
      default:
        break;
    }

    // P4: gayaFavorit
    switch (a.gayaFavorit) {
      case "Feminine dan manis":
        scores.Cheesecake += 3;
        break;
      case "Chic dan classy":
        scores.Blackforest += 3;
        break;
      case "Simple dan nyaman":
        scores.Tiramisu += 3;
        break;
      case "Fun dan berwarna":
        scores.Macaron += 3;
        break;
      case "Minimalist dan rapi":
        scores["Caramel Pudding"] += 3;
        break;
      default:
        break;
    }

    // P5: kataKamu
    switch (a.kataKamu) {
      case "Dreamy":
        scores.Cheesecake += 3;
        break;
      case "Confident":
        scores.Blackforest += 3;
        break;
      case "Grounded":
        scores.Tiramisu += 3;
        break;
      case "Playful":
        scores.Macaron += 3;
        break;
      case "Calm":
        scores["Caramel Pudding"] += 3;
        break;
      default:
        break;
    }

    // find top and second
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topName = entries[0][0];
    const topScore = entries[0][1];
    const secondName = entries[1][0];
    const secondScore = entries[1][1];

    // Tiebreak rules:
    // 1) If tie, pick based on Question 4 (gayaFavorit) preference
    // 2) If still tie, pick based on Question 5 (kataKamu)
    // 3) If still tie, pick based on Question 1 (warnaOutfit)
    let finalPrimary = topName;
    // handle exact tie for first
    const tied = entries.filter((e) => e[1] === topScore).map((e) => e[0]);
    if (tied.length > 1) {
      // try tiebreak Q4
      const q4 = a.gayaFavorit;
      const mapQ4 = {
        "Feminine dan manis": "Cheesecake",
        "Chic dan classy": "Blackforest",
        "Simple dan nyaman": "Tiramisu",
        "Fun dan berwarna": "Macaron",
        "Minimalist dan rapi": "Caramel Pudding",
      };
      const preferQ4 = mapQ4[q4];
      if (preferQ4 && tied.includes(preferQ4)) {
        finalPrimary = preferQ4;
      } else {
        // tie Q5
        const q5 = a.kataKamu;
        const mapQ5 = {
          Dreamy: "Cheesecake",
          Confident: "Blackforest",
          Grounded: "Tiramisu",
          Playful: "Macaron",
          Calm: "Caramel Pudding",
        };
        const preferQ5 = mapQ5[q5];
        if (preferQ5 && tied.includes(preferQ5)) {
          finalPrimary = preferQ5;
        } else {
          // tie Q1
          const q1 = a.warnaOutfit;
          const mapQ1 = {
            "Baby pink, cream, lilac": "Cheesecake",
            "Hitam, abu-abu, dark brown": "Blackforest",
            "Beige, olive, cokelat muda": "Tiramisu",
            "Biru langit, kuning, coral": "Macaron",
            "Putih, ivory, abu muda": "Caramel Pudding",
          };
          const preferQ1 = mapQ1[q1];
          if (preferQ1 && tied.includes(preferQ1)) {
            finalPrimary = preferQ1;
          } else {
            // fallback: choose first in alphabetical order of tied to keep deterministic
            finalPrimary = tied.sort()[0];
          }
        }
      }
    }

    // Mix-style rule: if top-second difference <= 2 => show "with a touch of"
    let mix = null;
    if (topScore - secondScore <= 2 && topScore !== secondScore) {
      mix = secondName;
    }

    // Versatile rule: if topScore <= 8 and no one strongly dominant (>8)
    let versatile = false;
    if (topScore <= 8 && topScore - secondScore <= 2) {
      versatile = true;
    }

    return {
      primary: finalPrimary,
      scores,
      topScore,
      secondName,
      secondScore,
      mix, // string or null
      versatile, // boolean
      undertone: a.undertone || "NEUTRAL",
      detailAnswers: a,
    };
  }

  // ============================
  // NEXT
  // ============================
  function goNext() {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // calculate
      const raw = {
        warnaOutfit: answers.warnaOutfit,
        undertone: answers.undertone || "NEUTRAL",
        acara: answers.acara,
        gayaFavorit: answers.gayaFavorit,
        kataKamu: answers.kataKamu,
      };
      const result = calculateStyleResult(raw);
      sessionStorage.setItem("styleQuizResult", JSON.stringify(result));
      // remove temp
      sessionStorage.removeItem("styleQuizTemp");
      navigate("/masukkan-nama");
    }
  }

  const q = questions[currentStep];
  const totalSteps = questions.length;

  return (
    <div className="relative min-h-screen bg-primary flex flex-col items-center px-5 py-10">
      {/* CLOSE BUTTON */}
      <button
        onClick={() => {
          sessionStorage.removeItem("styleQuizTemp");
          sessionStorage.removeItem("styleQuizResult");
          navigate("/");
        }}
        className="absolute top-5 right-5 text-[#C75E58] text-2xl font-bold"
        aria-label="Close"
      >
        ×
      </button>

      {/* TITLE */}
      <h1 className="text-pink1 text-2xl font-bold text-center mb-6 font-[Poppins]">
        OURFIT STYLE QUIZ
      </h1>

      {/* PROGRESS */}
      <div className="flex gap-3 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-10 rounded-full transition-all ${
              i === currentStep
                ? "bg-[#C64747]"
                : answers[questions[i].id]
                ? "bg-[#D27672]"
                : "bg-[#C9C5BB]"
            }`}
          ></div>
        ))}
      </div>

      {/* QUESTION */}
      <p className="text-gray-700 text-center mb-6 px-4 font-[Poppins] font-medium">{q.question}</p>

      {/* OPTIONS */}
      <div className="w-full max-w-md flex flex-col mb-10 font-[Poppins]">
        {q.options.map((op) => (
          <button
            key={op}
            onClick={() => handleSelect(q.id, op)}
            className={`w-full py-3 px-4 my-2 rounded-xl border text-left transition-all ${
              answers[q.id] === op
                ? "bg-pink1 text-white border-pink1"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* NEXT BUTTON */}
      <div className="w-full max-w-md">
        <button
          onClick={goNext}
          disabled={!isAnswered(q)}
          className={`
            w-full mt-3 py-3 rounded-full text-white text-lg transition-all
            ${
              isAnswered(q)
                ? "bg-pink1"
                : "bg-[#E2A6A3] opacity-60 cursor-not-allowed"
            }
          `}
        >
          {currentStep === totalSteps - 1 ? "Selesai" : "Lanjut"}
        </button>
        {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          className="w-full mt-3 py-3 rounded-full border bg-oren3 hover:bg-oren1 text-white text-lg transition-all"
        >
          Kembali
        </button>
      )}
      </div>
    </div>
  );
}
