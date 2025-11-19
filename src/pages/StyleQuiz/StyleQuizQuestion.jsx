import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StyleQuizQuestion() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // =============================
  //  PERTANYAAN OURFIT STYLE QUIZ
  // =============================
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
      question: "Warna kulit kamu cenderung punya undertone seperti apa?",
      options: [
        "Cool tone — cocok silver", // A
        "Warm tone — cocok gold", // B
        "Neutral tone — cocok keduanya", // C
      ],
    },
    {
      id: "acara",
      question: "Biasanya kamu pakai baju untuk acara apa?",
      options: [
        "Hangout santai / ngopi", // A
        "Event formal / meeting", // B
        "Jalan-jalan / traveling", // C
        "Kumpul bareng teman", // D
        "Acara kampus / kantor", // E
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
      options: [
        "Dreamy", // A
        "Confident", // B
        "Grounded", // C
        "Playful", // D
        "Calm", // E
      ],
    },
  ];

  // =============================
  //  STATE + LOAD TEMP (SESSION)
  // =============================
  const [answers, setAnswers] = useState({
    warnaOutfit: "",
    undertone: "",
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

  function isAnswered(q) {
    return answers[q.id] !== "";
  }

  // =============================
  // STYLE SCORING
  // =============================
  function calculateStyleResult(a) {
    const map = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    const optionToLetter = (questionId, selected) => {
      const index = questions
        .find((q) => q.id === questionId)
        .options.indexOf(selected);

      return ["A", "B", "C", "D", "E"][index];
    };

    Object.keys(a).forEach((q) => {
      const letter = optionToLetter(q, a[q]);
      map[letter] += 1;
    });

    const top = Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];

    const resultMap = {
      A: "Luna Girl",
      B: "Noir Girl",
      C: "Terra Girl",
      D: "Astra Girl",
      E: "Velvet Girl",
    };

    return {
      type: resultMap[top],
      rawScore: map,
      detail: a,
    };
  }

  // =============================
  // NEXT
  // =============================
  function goNext() {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const styleResult = calculateStyleResult(answers);

      sessionStorage.setItem("styleQuizResult", JSON.stringify(styleResult));

      navigate("/masukkan-nama");
    }
  }

  const q = questions[currentStep];

  return (
    <div className="relative min-h-screen bg-[#F7E3C6] flex flex-col items-center px-5 py-10">
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

      {/* TITLE */}
      <h1 className="text-[#C64747] text-2xl font-bold text-center mb-6">
        PILIH YANG PALING SESUAI DENGANMU
      </h1>

      {/* PROGRESS */}
      <div className="flex gap-3 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-10 rounded-full transition-all
              ${
                i === currentStep
                  ? "bg-[#C64747]"
                  : answers[questions[i].id]
                  ? "bg-[#D27672]"
                  : "bg-[#C9C5BB]"
              }
            `}
          ></div>
        ))}
      </div>

      {/* QUESTION */}
      <p className="text-gray-700 text-center mb-6 px-4">{q.question}</p>

      {/* OPTIONS */}
      <div className="w-full max-w-md flex flex-col mb-10">
        {q.options.map((op) => (
          <button
            key={op}
            onClick={() => handleSelect(q.id, op)}
            className={`w-full py-3 px-4 my-2 rounded-xl border text-left transition-all
              ${
                answers[q.id] === op
                  ? "bg-[#D27672] text-white border-[#D27672]"
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
          className={`w-full py-3 rounded-full text-white text-lg transition-all
            ${
              isAnswered(q)
                ? "bg-[#C85E5A]"
                : "bg-[#E2A6A3] opacity-60 cursor-not-allowed"
            }`}
        >
          {currentStep === questions.length - 1 ? "Selesai" : "Lanjut"}
        </button>
      </div>
    </div>
  );
}
