import { createContext, useState, useEffect } from "react";
import api from "../../api/api";

export const productsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return <productsContext.Provider value={{ products }}>{children}</productsContext.Provider>;
}
