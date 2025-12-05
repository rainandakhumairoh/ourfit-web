import { useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productsContext } from "../../context/Products/Products";

export default function Wardrobe() {
  const { products } = useContext(productsContext); // ambil data produk dari context

  const handleWishlist = (id) => {
    console.log("Wishlist toggled:", id);
  };

  return (
    <div className="min-h-screen bg-coklat p-10 pt-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Wardrobe Collection
        </h2>

        {/* Grid 3 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlistToggle={handleWishlist}
              isWished={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
