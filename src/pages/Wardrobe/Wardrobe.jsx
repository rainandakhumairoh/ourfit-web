import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { productsContext } from "../../context/ProductsProvider/ProductsProvider";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductTopSection from "../Products/ProductTopSection";
import { UserContext } from "../../context/UserContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wished, setWished] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Product");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const handleWishToggle = (id) => {
    setWished((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered =
    activeCategory === "All Product"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
  <>
    <ProductTopSection
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      currentUser={currentUser}
    />
    <div className="min-h-screen bg-coklat p-10 pt-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Wardrobe Collection
        </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
      </div>
    </div>
  </>
  );
}
