import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function MixMatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="min-h-screen bg-[#fff7ed] px-6 py-10 flex flex-col items-center  p-10 pt-28">
      <button onClick={() => navigate(-1)} className="absolute top-15 left-12 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition-all active:scale-95">
        <ArrowLeft size={20} />
      </button>

      <div className="w-full max-w-5xl bg-[#fff7ed] rounded-2xl flex flex-col md:flex-row gap-10">
        {/* FOTO PRODUK */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="bg-white border-2 border-[#f4cda3] rounded-2xl aspect-square w-full flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-2/3 h-2/3 object-contain"
            />
          </div>
        </div>

        {/* DETAIL */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-[#5a2e0f] mb-2">
            {item.title}
          </h1>
          <p className="text-xl font-bold text-[#804000] mb-4">
            Rp{(item.price * 10000).toLocaleString("id-ID")}
          </p>
          <p className="text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
