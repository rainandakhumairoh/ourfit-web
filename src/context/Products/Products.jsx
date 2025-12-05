import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const productsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/products")
       .then(res => setProducts(res.data));
}, []);


  return <productsContext.Provider value={{ products }}>{children}</productsContext.Provider>;
}
