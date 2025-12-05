import { useContext } from "react";
import { productsContext } from "../../context/ProductsProvider/ProductsProvider";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Products() {
  const { products } = useContext(productsContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
