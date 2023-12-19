import React from "react";

import Header from "./components/Header";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [isCartOpened, setIsCartOpened] = React.useState(false);

  const getItems = () => {
    return fetch("https://6580b9a43dfdd1b11c42016b.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setItems(res);
      });
  };

  React.useEffect(() => {
    getItems();
  }, []);

  const onAddtoCart = (obj) => {
    console.log(cartItems)
    
    setCartItems(prev => [...prev, obj])
  };

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer onClose={() => setIsCartOpened(false)} items={cartItems} />
      )}
      <Header onClickOpenCart={() => setIsCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Поиск" />
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-between">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              cardId={item.id}
              onPlus={onAddtoCart}
              onFavorite={(obj) => console.log(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
