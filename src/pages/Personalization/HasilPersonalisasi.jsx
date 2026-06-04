import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import PersonalizationCard from "../../components/PersonalizationCard/PersonalizationCard";

export default function HasilPersonalisasi() {
  const { currentUser } = useContext(UserContext);

  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        if (!currentUser?._id) return;

        const res = await axios.get(
          `http://localhost:5000/api/personalization/${currentUser._id}`
        );

        setResult(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [currentUser]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7E3C6] px-6 py-10 relative">
      <h1 className="text-[#C64747] text-3xl font-bold text-center">
        Hai, {result.name || "User"}! ✨
      </h1>

      <p className="text-center text-gray-700 mt-1 mb-8">
        Ini hasil personalisasi lengkap untukmu.
      </p>

      <PersonalizationCard
        smart={result.smartFit}
        styleRes={result.styleQuiz}
        readOnly={true}
      />
    </div>
  );
}