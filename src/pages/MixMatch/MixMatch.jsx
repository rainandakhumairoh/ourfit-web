import { useEffect, useState } from "react";
import axios from "axios";
import MixMatchCard from "../../components/MixMatchCard/MixMatchCard";

export default function MixMatch() {
  const [mixes, setMixes] = useState([]);
  const [saved, setSaved] = useState([]);

  // Ambil data dari fakestoreapi
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setMixes(res.data))
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const handleSaveToggle = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-pink2 p-10 pt-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mix & Match Inspiration
        </h2>

        {/* Grid 3 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mixes.map((mix) => (
            <MixMatchCard
              key={mix.id}
              item={mix}
              onSaveToggle={handleSaveToggle}
              isSaved={saved.includes(mix.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
