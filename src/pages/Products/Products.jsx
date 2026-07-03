import { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { productsContext } from "../../context/ProductsProvider/ProductsProvider";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductTopSection from "./ProductTopSection";
import { UserContext } from "../../context/UserContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wished, setWished] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const handleWishToggle = (id) => {
    setWished((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filtered = activeCategory === "All" ? products : products.filter((m) => m.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <ProductTopSection activeCategory={activeCategory} onCategoryChange={setActiveCategory} currentUser={currentUser} />

      <div className="bg-pink2">
        <div className="max-w-6xl mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
