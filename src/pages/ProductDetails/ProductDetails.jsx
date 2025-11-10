import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("deskripsi");

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`) // contoh API, nanti sesuaikan
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="min-h-screen bg-[#fff7ed] px-6 py-10 flex flex-col items-center p-10 pt-28">
      <button onClick={() => navigate(-1)} className="absolute top-15 left-12 bg-pink1 text-white p-3 rounded-full shadow-md hover:bg-oren2 transition-all active:scale-95">
        <ArrowLeft size={20} />
      </button>
      <div className="w-full max-w-5xl bg-[#fff7ed] rounded-2xl flex flex-col md:flex-row gap-10">
        {/* FOTO PRODUK */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="bg-white border-2 border-[#f4cda3] rounded-2xl aspect-square w-full flex items-center justify-center">
            <img src={product.image} alt={product.title} className="w-2/3 h-2/3 object-contain" />
          </div>

          {/* Thumbnail kecil (dummy) */}
          <div className="flex justify-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-14 h-14 bg-white border border-[#f4cda3] rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* DETAIL PRODUK */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-[#5a2e0f] mb-2">{product.title}</h1>
          <p className="text-xl font-bold text-[#804000] mb-4">Rp{(product.price * 10000).toLocaleString("id-ID")}</p>

          {/* WARNA */}
          <p className="font-medium text-[#5a2e0f] mb-2">Warna</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Broken white", "Ivory", "Soft pink", "Maroon"].map((color) => (
              <span key={color} className="px-3 py-1 bg-[#f4cda3] text-[#5a2e0f] rounded-full text-sm font-medium">
                {color}
              </span>
            ))}
          </div>

          {/* UKURAN */}
          <p className="font-medium text-[#5a2e0f] mb-2">Ukuran</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Petite size", "All size"].map((size) => (
              <span key={size} className="px-3 py-1 bg-[#f4cda3] text-[#5a2e0f] rounded-full text-sm font-medium">
                {size}
              </span>
            ))}
          </div>

          {/* TOMBOL */}
          <div className="flex items-center gap-4">
            <button className="flex-1 bg-pink1 hover:bg-oren2 text-white font-semibold py-3 rounded-full shadow-md transition">Beli sekarang</button>
            <button className="p-3 border-2 border-[#d17261] rounded-full text-[#d17261] hover:bg-[#d17261]/10 transition">
              <Heart />
            </button>
          </div>
        </div>
      </div>

      {/* TAB DESKRIPSI / REVIEW */}
      <div className="w-full max-w-5xl bg-white border-2 border-[#f4cda3] rounded-2xl mt-10 p-6">
        <div className="flex border-b border-[#f4cda3] mb-4">
          <button onClick={() => setActiveTab("deskripsi")} className={`flex-1 py-2 font-semibold ${activeTab === "deskripsi" ? "text-[#804000] border-b-4 border-[#804000]" : "text-gray-400"}`}>
            Deskripsi
          </button>
          <button onClick={() => setActiveTab("review")} className={`flex-1 py-2 font-semibold ${activeTab === "review" ? "text-[#804000] border-b-4 border-[#804000]" : "text-gray-400"}`}>
            Review
          </button>
        </div>

        {activeTab === "deskripsi" ? <p className="text-gray-700 leading-relaxed">{product.description}</p> : <p className="text-gray-500 italic">Belum ada review.</p>}
      </div>
    </div>
  );
}
