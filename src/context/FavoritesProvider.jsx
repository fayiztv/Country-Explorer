import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavs = (country) => {
    setFavorites((prev)=> [...prev, country])
  }

  const removeFavs = (code) => {
    setFavorites((prev) => prev.filter((c)=> c.cca3 !== code))
  }

  const isFavs = (code) => {
    return favorites.some((c) => c.cca3 === code)
  }

  return (
    <FavoritesContext.Provider value={{favorites, addFavs, removeFavs, isFavs}} >
        {children}
    </FavoritesContext.Provider>
  )
};