import React from "react";

import axios from "axios";
import styles from "./Drawer.module.scss";
import Info from "../Info/Info";
import { AppContext } from "../../contexts/AppContext";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items, removeCartItems }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://dbb7a389e00c56d3.mokky.dev/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setCartItems([]);
      setIsOrderComplete(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://dbb7a389e00c56d3.mokky.dev/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.drawer} d-flex flex-column`}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className={styles.removeBtn}
            src="/img/remove-sneakers.svg"
            alt="Закрытие"
          />
        </h2>
        {items.length === 0 ? (
          <Info
            isOrderComplete={isOrderComplete}
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            descripton={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "/img/complete-order.png" : "/img/box.png"}
          />
        ) : (
          <div className={`${styles.container} d-flex flex-column`}>
            <div className={styles.items}>
              {items.map((obj, index) => (
                <div
                  className={`${styles.cartItem} d-flex align-center mb-20`}
                  key={index}
                >
                  <div
                    className={styles.cartImage}
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  ></div>
                  <div className={`${styles.cartInfo} mr-20`}>
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => {
                      removeCartItems(obj.id);
                    }}
                    className={styles.removeBtn}
                    src="/img/remove-sneakers.svg"
                    alt="Удаление"
                  />
                </div>
              ))}
            </div>
            <div className={`${styles.price} d-flex flex-column`}>
              <ul>
                <li className="d-flex align-center mb-20">
                  <p>Итого:</p>
                  <div className={styles.dashedBorder}></div>
                  <b>21 498 руб.</b>
                </li>

                <li className="d-flex align-center">
                  <p>Налог 5%:</p>
                  <div className={styles.dashedBorder}></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenBtn"
                onClick={onClickOrder}
              >
                Оформить заказ
                <img
                  className="imgArrow"
                  src="/img/arrow.svg"
                  alt="Стрелочка"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
