import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import karakterAnimasi from "../../assets/welcomingkarakter2.png";
import { UserContext } from "../../context/UserContext";

export default function SmartFit() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [alreadyPersonalized, setAlreadyPersonalized] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    async function checkPersonalization() {
      try {
        const userId = currentUser.id || currentUser._id;

        if (!userId) {
          setLoading(false);
          return;
        }

        const res = await api.get(`/personalization/${userId}`);

        if (res.data) {
          setAlreadyPersonalized(true);
        }
      } catch (err) {
        console.log("Belum ada personalisasi");
      } finally {
        setLoading(false); // WAJIB
      }
    }

    checkPersonalization();
  }, [currentUser]);

  async function handleRetake() {
    try {
      const userId = currentUser.id || currentUser._id;

      await api.delete(`/personalization/${userId}`);

      sessionStorage.removeItem("smartFitResult");
      sessionStorage.removeItem("styleQuizResult");

      navigate("/smart-fit/question");
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err);

      alert(err.response?.data?.message || "Gagal mengulang personalisasi");
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#F8E3C3] flex justify-center items-center px-6 relative">
      <button onClick={() => navigate("/")} className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95">
        ✕
      </button>

      <div className="w-full max-w-[600px] flex flex-col items-center text-center">
        <img src={karakterAnimasi} alt="karakter smartfit" className="w-72 h-auto object-contain" />

        <h1 className="text-pink1 text-xl md:text-2xl lg:text-2xl font-bold font-[Poppins] mt-6">
          AYO TEMUKAN UKURAN YANG
          <br />
          FIT DENGAN SMART FIT!
        </h1>

        {alreadyPersonalized ? (
          <>
            <p className="text-coklat text-sm max-w-[350px] mt-3">Kamu sudah pernah melakukan personalisasi.</p>

            <button onClick={() => navigate("/profile")} className="w-[350px] py-2 mt-8 bg-pink1 hover:bg-oren2 text-white  rounded-full text-lg font-medium  shadow-sm transition">
              Lihat Hasil Saya
            </button>

            <button onClick={handleRetake} className="w-[350px] py-2 mt-4 text-white bg-coklat hover:bg-oren3 rounded-full text-lg font-medium shadow-sm transition">
              Personalisasi Ulang
            </button>
          </>
        ) : (
          <>
            <p className="text-coklat text-sm font-medium px-8 mt-3 font-[Poppins]">Siap cari ukuran paling pas? Yuk jawab beberapa pertanyaan cepat biar kami bantu temukan size outfitmu dalam hitungan detik!</p>

            <button onClick={() => navigate("/smart-fit/question")} className="mt-8 bg-pink1 hover:bg-oren2 text-white px-10 py-3 rounded-full text-lg font-medium w-[180px] shadow-md transition">
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
}
