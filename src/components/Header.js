import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { AppContext } from "../contexts/AppContext";

function Header(props) {
  const { totalPrice } = useCart();
  const { isCartOpened } = React.useContext(AppContext);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (isCartOpened) document.body.classList.add("body-overflow");
    else {
      document.body.classList.remove("body-overflow");
    }
  }, [isCartOpened]);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="логотип" />
          <div>
            <h3 className="text-uppercase">REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li
          onClick={props.onClickOpenCart}
          className={`mr-30 cu-p d-flex align-center ${
            isCartOpened && "activeNav"
          }`}
        >
          <img
            className="mr-10"
            width={18}
            height={18}
            src="img/basket.svg"
            alt="корзина"
          />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="favorites">
          <li
            className={`mr-30 cu-p d-flex align-center ${
              pathname === "favorites" && "activeNav"
            }`}
          >
            <img
              className="mr-10"
              width={18}
              height={18}
              src="img/like.svg"
              alt="лайк"
            />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to="orders">
          <li
            className={`d-flex cu-p align-center ${
              pathname === "orders" && "activeNav"
            }`}
          >
            <img
              className="mr-10"
              width={18}
              height={18}
              src="img/profile.svg"
              alt="иконка-профиля"
            />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
