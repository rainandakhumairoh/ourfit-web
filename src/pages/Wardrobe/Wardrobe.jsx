import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { productsContext } from "../../context/ProductsProvider/ProductsProvider";
import ProductCard from "../../components/ProductCard/ProductCard";
import { UserContext } from "../../context/UserContext";
import ProductTopSection, { filterAndSortProducts } from "../Products/ProductTopSection";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wished, setWished] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Product");
  const { currentUser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

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

  // 1. Filter by category dulu
  const byCategory =
    activeCategory === "All Product"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  // 2. Lalu filter by search + sort
  const displayed = filterAndSortProducts(byCategory, search, sort);

  return (
    <>
      <ProductTopSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        currentUser={currentUser}
        searchValue={search}
        onSearchChange={setSearch}
        sortValue={sort}
        onSortChange={setSort}
      />
      <div className="min-h-screen bg-coklat p-10 pt-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8 font-[Poppins]">
            Wardrobe Collection
          </h2>

          {displayed.length === 0 ? (
            <p className="text-center text-white/60 mt-16">
              Produk tidak ditemukan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayed.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wished={wished.includes(product._id)}
                  onWishToggle={handleWishToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}