import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Favorites from "./pages/Favorites/Favorites";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import { AppContext } from "./contexts/AppContext";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setIsfavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isCartOpened, setIsCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const getItems = () => {
    return axios.get("https://dbb7a389e00c56d3.mokky.dev/items");
  };

  const getFavorites = () => {
    return axios.get("https://dbb7a389e00c56d3.mokky.dev/favorites");
  };

  const getCartItems = () => {
    return axios.get("https://dbb7a389e00c56d3.mokky.dev/cart");
  };

  const removeCartItems = (id) => {
    axios.delete(`https://dbb7a389e00c56d3.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([getItems(), getCartItems(), getFavorites()])
      .then(([items, cartItems, favorites]) => {
        setItems(items.data);
        setIsfavorites(favorites.data);
        setCartItems(cartItems.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const onAddtoCart = async (obj) => {
    try {
      if (cartItems.find((cartObj) => cartObj.cardId === obj.cardId)) {
        const [curentCart] = cartItems.filter(
          (cartObj) => cartObj.cardId === obj.cardId
        );
        setCartItems((prev) =>
          prev.filter((item) => item.cardId !== obj.cardId)
        );
        await axios.delete(
          `https://dbb7a389e00c56d3.mokky.dev/cart/${curentCart.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://dbb7a389e00c56d3.mokky.dev/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.cardId === obj.cardId)) {
        const [card] = favorites.filter((item) => item.cardId === obj.cardId);
        setIsfavorites((prev) =>
          prev.filter((item) => item.cardId !== obj.cardId)
        );
        axios.delete(`https://dbb7a389e00c56d3.mokky.dev/favorites/${card.id}`);
      } else {
        const { data } = await axios.post(
          "https://dbb7a389e00c56d3.mokky.dev/favorites",
          obj
        );
        setIsfavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (evt) => {
    setSearchValue(evt.target.value);
  };

  const addedToFavorite = (cardId) => {
    return favorites.some((obj) => obj.cardId === cardId);
  };

  const addedToCart = (cardId) => {
    return cartItems.some((obj) => obj.cardId === cardId);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        setCartItems,
        favorites,
        addedToCart,
        addedToFavorite,
        setIsCartOpened,
        onAddtoCart,
        onAddToFavorite,
        isLoading,
        isCartOpened,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setIsCartOpened(false)}
          items={cartItems}
          removeCartItems={removeCartItems}
          opened={isCartOpened}
        />
        <Header onClickOpenCart={() => setIsCartOpened(true)} />
        <Routes>
          <Route path="favorites" element={<Favorites />} />

          <Route
            path=""
            exact
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
              />
            }
          />

          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
