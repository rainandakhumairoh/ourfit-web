import { createContext, useState } from 'react';

export const wishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishlist(id) {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
    }
  }

  function deleteWishlistItem(id) {
    setWishlist(wishlist.filter((item) => item !== id));
  }

  return (
    <wishlistContext.Provider value={{ wishlist, addToWishlist, deleteWishlistItem }}>
      {children}
    </wishlistContext.Provider>
  );
}
