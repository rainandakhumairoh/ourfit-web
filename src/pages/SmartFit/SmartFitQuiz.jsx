import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SmartFitQuiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // =============================
  //  PERTANYAAN QUIZ
  // =============================
  const questions = [
    {
      id: "tinggi",
      question: "Tinggi kamu berapa?",
      options: [
        "Kurang dari 150 cm",
        "150-155 cm",
        "156-160 cm",
        "161-165 cm",
        "Lebih dari 165 cm"
      ],
    },
    {
      id: "berat",
      question: "Berat kamu sekitar berapa?",
      options: [
        "Kurang dari 45 kg",
        "45-50 kg",
        "51-55 kg",
        "56-60 kg",
        "61-65 kg",
        "Lebih dari 65 kg"
      ],
    },
    {
      id: "lingkarDada",
      question: "Ukuran lingkar dada kamu? Ukur di bagian paling penuh ya",
      options: [
        "Kurang dari 80 cm",
        "80-85 cm",
        "86-90 cm",
        "91-95 cm",
        "96-100 cm",
        "Lebih dari 100 cm"
      ],
    },
    {
      id: "lingkarPinggang",
      question: "Ukuran lingkar pinggang? Di bagian paling kecil",
      options: [
        "Kurang dari 60 cm",
        "60-65 cm",
        "66-70 cm",
        "71-75 cm",
        "76-80 cm",
        "Lebih dari 80 cm"
      ],
    },
    {
      id: "bodyShape",
      question: "Kalo disuruh pilih, bentuk badan kamu yang mana?",
      options: [
        "Petite - Mungil banget dari ujung rambut sampe kaki",
        "Pear - Bawahnya (pinggul) lebih berisi",
        "Hourglass - Atasnya oke, bawahnya oke, tengahnya langsing",
        "Rectangle - Rata dari atas sampe bawah",
        "Apple - Bagian tengah (perut) lebih berisi",
        "Inverted Triangle - Atasnya (bahu/dada) lebih lebar",
      ],
    },
    {
      id: "style",
      question: "Style baju favorit kamu yang gimana?",
      options: [
        "Yang ketat ngepas di badan",
        "Yang santai aja, nyaman ga terlalu ketat",
        "Yang gede oversized biar adem",
      ],
    },
    {
      id: "problems",
      question: "Paling sering ngalamin problem apa kalo shopping baju? (Centang semua yang pernah dialamin)",
      type: "checkbox",
      options: [
        "Baju selalu kepanjangan",
        "Lengan kudu digulung mulu",
        "Celana nyeret ke lantai",
        "Pinggang longgar kebesaran",
        "Kancing baju di dada suka mepet",
        "Bagian pinggul/paha suka kenceng",
        "Bahu suka ga pas tempatnya",
      ],
    },
    {
      id: "usualSize",
      question: "Kalo beli baju biasanya ambil size apa?",
      options: ["XS", "S", "M", "L", "XL"],
    },
  ];

  // =============================
  //  STATE + LOAD
  // =============================
  const [answers, setAnswers] = useState({
    tinggi: "",
    berat: "",
    lingkarDada: "",
    lingkarPinggang: "",
    bodyShape: "",
    style: "",
    problems: [],
    usualSize: "",
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("smartFitTemp");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  // =============================
  //  SAVE TEMPORARY
  // =============================
  function saveTemp(updated) {
    sessionStorage.setItem("smartFitTemp", JSON.stringify(updated));
  }

  // =============================
  // HANDLE SELECT
  // =============================
  function handleSelect(questionId, value) {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      saveTemp(updated);
      return updated;
    });
  }

  // HANDLE CHECKBOX
  function handleCheckbox(questionId, option) {
    setAnswers((prev) => {
      const arr = prev[questionId] || [];
      const updated = arr.includes(option)
        ? arr.filter((i) => i !== option)
        : [...arr, option];

      const final = { ...prev, [questionId]: updated };
      saveTemp(final);
      return final;
    });
  }

  function isAnswered(q) {
    if (q.type === "checkbox") return answers[q.id].length > 0;
    return answers[q.id] !== "";
  }

  // =============================
  //  NEXT
  // =============================
  function goNext() {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const result = calculateSmartFitResult(answers);

      sessionStorage.setItem("smartFitResult", JSON.stringify(result));
      sessionStorage.removeItem("smartFitTemp");

      navigate("/smart-fit/done");
    }
  }

  // =============================
  //  SMART FIT LOGIC
  // =============================
  function extract(str) {
    if (!str) return 0;
    const num = str.match(/\d+/);
    return num ? Number(num[0]) : 0;
  }

function calculateSmartFitResult(a) {
  const tinggi = extract(a.tinggi);
  const berat = extract(a.berat);

  // Hitung BMI
  const tinggiM = tinggi / 100;
  const BMI = (berat / (tinggiM * tinggiM)).toFixed(1);

  // ===== LOGIC BARU =====
  let sizeCategory = "";

  if (tinggi < 156) {
    sizeCategory = "PETITE SIZE";
  } else {
    sizeCategory = "ALL SIZE";
  }

  return {
    sizeCategory,
    BMI,
    details: a, // tetap simpan semua jawaban user
  };
}


  const q = questions[currentStep];
  const totalSteps = questions.length;

  return (
    <div className="relative min-h-screen bg-[#F7E3C6] flex flex-col items-center px-5 py-10">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => {
          sessionStorage.removeItem("smartFitTemp");
          sessionStorage.removeItem("smartFitResult");
          navigate("/");
        }}
        className="absolute top-5 right-5 text-[#C75E58] text-2xl font-bold"
      >
        ×
      </button>

      {/* TITLE */}
      <h1 className="text-[#C64747] text-2xl font-bold text-center mb-6">
        PILIH YANG PALING SESUAI DENGANMU
      </h1>

      {/* PROGRESS BAR */}
      <div className="flex gap-3 mb-8">
        {questions.map((qItem, i) => {
          const filled = isAnswered(qItem);

          return (
            <div
              key={i}
              className={`h-2 w-10 rounded-full transition-all
                ${
                  i === currentStep
                    ? "bg-[#C64747]"
                    : filled
                    ? "bg-[#D27672]"
                    : "bg-[#C9C5BB]"
                }`}
            ></div>
          );
        })}
      </div>

      {/* QUESTION */}
      <p className="text-gray-700 text-center mb-6 px-4">{q.question}</p>

      {/* OPTIONS */}
      <div className="w-full max-w-md flex flex-col mb-10">
        {q.type === "checkbox"
          ? q.options.map((op) => (
              <label
                key={op}
                className="flex items-center gap-3 bg-white border rounded-xl p-3 my-2"
              >
                <input
                  type="checkbox"
                  checked={answers[q.id]?.includes(op)}
                  onChange={() => handleCheckbox(q.id, op)}
                />
                <span>{op}</span>
              </label>
            ))
          : q.options.map((op) => (
              <button
                key={op}
                onClick={() => handleSelect(q.id, op)}
                className={`
                  w-full py-3 px-4 my-2 rounded-xl border text-left transition-all
                  ${
                    answers[q.id] === op
                      ? "bg-[#D27672] text-white border-[#D27672]"
                      : "bg-white text-gray-700 border-gray-300"
                  }
                `}
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
            w-full py-3 rounded-full text-white text-lg transition-all
            ${
              isAnswered(q)
                ? "bg-[#C85E5A]"
                : "bg-[#E2A6A3] opacity-60 cursor-not-allowed"
            }
          `}
        >
          {currentStep === totalSteps - 1 ? "Selesai" : "Lanjut"}
        </button>
      </div>
    </div>
  );
}
