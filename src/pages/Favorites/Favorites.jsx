import React from "react";
import styles from "./Favorites.module.scss";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";
import { AppContext } from "../../contexts/AppContext";

function Favorites() {
  const { favorites, isLoading } = React.useContext(AppContext);

  return (
    <section className={styles.favorites}>
      {favorites.length === 0 ? (
        <div className={styles.emptyBlock}>
          <div className="d-flex flex-column align-center">
            <img width={70} src="img/sat-smile.png" alt="Грустный смайл" />
            <h3>Закладок нет :(</h3>
            <p>Вы ничего не добавляли в закладки</p>
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
            <h1>Мои закладки</h1>
          </div>
          <div className={styles.cardTable}>
            {favorites.map((item, index) => (
              <Card
                key={index}
                loading={isLoading}
                {...item}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Favorites;
