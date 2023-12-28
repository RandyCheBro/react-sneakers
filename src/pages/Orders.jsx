import React from "react";
import styles from "../pages/Favorites/Favorites.module.scss";
import { Link } from "react-router-dom";

import Card from "../components/Card/Card";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://dbb7a389e00c56d3.mokky.dev/orders"
        );
        const items = data.reduce((prev, obj) => [...prev, ...obj.items], []);
        setOrders(items);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <section className={styles.favorites}>
      {orders.length === 0 ? (
        <div className={styles.emptyBlock}>
          <div className="d-flex flex-column align-center">
            <img width={70} src="img/cry-smile.png" alt="Плачущий смайл" />
            <h3>У вас нет заказов</h3>
            <p>Вы ещё ничего не покупали.</p>
            <Link to="/">
              <button className="greenBtn greenBtn_short_width">
                Вернуться назад
                <img
                  className="imgLeftArrow"
                  src="img/arrow-left.svg"
                  alt="Стрелочка"
                />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex">
            <Link to="/">
              <img src="img/left-small-arrow.svg" alt="Назад"></img>
            </Link>
            <h1>Мои покупки</h1>
          </div>
          <div className={styles.cardTable}>
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Orders;
