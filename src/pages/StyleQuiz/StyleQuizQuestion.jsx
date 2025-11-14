import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StyleQuizQuestion() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      id: "tinggi",
      question: "Tinggi kamu berapa?",
      options: ["<150", "150-155", "156-160", "161-165", ">165"],
    },
    {
      id: "berat",
      question: "Berat kamu sekitar berapa?",
      options: ["<45", "45-50", "51-55", "56-60", "61-65", ">65"],
    },
    {
      id: "lingkarDada",
      question: "Ukuran lingkar dada kamu?",
      options: ["<80", "80-85", "86-90", "91-95", "96-100", ">100"],
    },
    {
      id: "lingkarPinggang",
      question: "Ukuran lingkar pinggang?",
      options: ["<60", "60-65", "66-70", "71-75", "76-80", ">80"],
    },
    {
      id: "bodyShape",
      question: "Bentuk badan kamu yang mana?",
      options: ["Petite", "Pear", "Hourglass", "Rectangle", "Apple", "Inverted Triangle"],
    },
    {
      id: "style",
      question: "Style baju favorit kamu yang gimana?",
      options: ["Fitted", "Regular", "Oversized"],
    },
    {
      id: "problems",
      question: "Paling sering ngalamin problem apa? (Bisa pilih lebih dari 1)",
      type: "checkbox",
      options: [
        "Baju selalu kepanjangan",
        "Lengan kudu digulung mulu",
        "Celana nyeret ke lantai",
        "Pinggang longgar kebesaran",
        "Kancing dada mepet",
        "Pinggul/paha kenceng",
        "Bahu ga pas",
        "Tidak ada masalah",
      ],
    },
    {
      id: "usualSize",
      question: "Biasanya ambil size apa?",
      options: ["XS", "S", "M", "L", "XL"],
    },
  ];

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

  function handleSelect(questionId, value) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function handleCheckbox(questionId, option) {
    setAnswers((prev) => {
      const arr = prev[questionId] || [];
      if (arr.includes(option)) {
        return { ...prev, [questionId]: arr.filter((i) => i !== option) };
      } else {
        return { ...prev, [questionId]: [...arr, option] };
      }
    });
  }


  function isAnswered(question) {
  const value = answers[question.id];

  if (question.type === "checkbox") {
    return value && value.length > 0; // minimal 1 centang
  }

  return value !== ""; // option dipilih
}

  // ============================
  // NEXT BUTTON
  // ============================
function goNext() {
  if (currentStep < questions.length - 1) {
    setCurrentStep(prev => prev + 1);
  } else {
    const result = calculateSmartFitResult(answers);

    // Simpan hasil Smart Fit
    localStorage.setItem("smartFitResult", JSON.stringify(result));

    // Arahkan ke halaman "Smart Fit Done"
    navigate("/smart-fit/done");
  }
}

  // ============================
  // SMART FIT LOGIC
  // ============================

  function extractNumber(str) {
    if (!str) return 0;
    if (str.includes("<")) return Number(str.replace("<", ""));
    if (str.includes(">")) return Number(str.replace(">", ""));
    return Number(str.split("-")[0]);
  }

  function calculateSmartFitResult(a) {
    const tinggi = extractNumber(a.tinggi);
    const berat = extractNumber(a.berat);
    const lingkarDada = extractNumber(a.lingkarDada);

    const tinggiMeter = tinggi / 100;
    const BMI = berat / (tinggiMeter * tinggiMeter);

    let petiteCount = 0;

    if (tinggi <= 155) petiteCount++;
    if (berat <= 55) petiteCount++;
    if (lingkarDada <= 90) petiteCount++;
    if (a.bodyShape === "Petite") petiteCount++;
    if (a.style === "Fitted") petiteCount++;

    const panjangIssues = [
      "Baju selalu kepanjangan",
      "Lengan kudu digulung mulu",
      "Celana nyeret ke lantai",
    ];

    let panjangCount = a.problems.filter((p) => panjangIssues.includes(p)).length;
    if (panjangCount >= 2) petiteCount++;

    let petiteScore = petiteCount;
    let allScore = 0;

    if (BMI < 18.5) petiteScore += 1;
    else if (BMI >= 25 && BMI <= 29.9) allScore += 1;
    else if (BMI >= 30) allScore += 2;

    let sizeCategory = "ALL SIZE";
    if (petiteScore >= 3 && allScore === 0) sizeCategory = "PETITE SIZE";

    return {
      sizeCategory,
      petiteScore,
      allScore,
      BMI: BMI.toFixed(1),
      details: a,
    };
  }

  const q = questions[currentStep];

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{q.question}</h2>

      {q.type === "checkbox" ? (
        q.options.map((op) => (
          <label key={op} className="flex gap-3 mb-2">
            <input
              type="checkbox"
              checked={answers[q.id]?.includes(op)}
              onChange={() => handleCheckbox(q.id, op)}
            />
            {op}
          </label>
        ))
      ) : (
        q.options.map((op) => (
          <button
            key={op}
            onClick={() => handleSelect(q.id, op)}
            className={`block w-full p-3 my-2 rounded-lg border ${
              answers[q.id] === op ? "bg-black text-white" : "bg-white"
            }`}
          >
            {op}
          </button>
        ))
      )}

      <button
        onClick={goNext}
        disabled={!isAnswered(q)}
        className={`mt-5 w-full p-3 rounded-lg 
          ${isAnswered(q) ? "bg-black text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
        `}
      >
        {currentStep === questions.length - 1 ? "Selesai" : "Lanjut"}
      </button>
    </div>
  );
}
