import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MixMatchCard from "../../components/MixMatchCard/MixMatchCard";
import MixMatchTopSection from "./MixMatchTopSection";
import { UserContext } from "../../context/UserContext";


export default function MixMatch() {
  const [mixes, setMixes] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mixmatch")
      .then((res) => setMixes(res.data))
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const handleSaveToggle = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered =
    activeCategory === "All"
      ? mixes
      : mixes.filter(
          (m) => m.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <>
    <MixMatchTopSection
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      currentUser ={currentUser }
    />
    <div className="min-h-screen bg-pink2 p-10 pt-6">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mix & Match Inspiration
        </h2> */}

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
    </>
  );
}
