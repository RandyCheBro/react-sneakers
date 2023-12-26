import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../contexts/AppContext";


function Card({
  title,
  price,
  imageUrl,
  id,
  cardId,
  onPlus,
  onFavorite,
  loading,
}) {
  const {addedToCart, addedToFavorite} = React.useContext(AppContext)

  const onClickFavorite = () => {
    onFavorite({ title, price, imageUrl, id, cardId });
  };

  const onClickPlus = () => {
    onPlus({ title, price, imageUrl, id, cardId });
  };

  return (
    <div className={`${styles.card} ${loading && styles.cardPreloading}`}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#F3F3F3"
          foregroundColor="#E7F6FF"
          /* {...props} */
        >
          <rect x="30" y="144" rx="3" ry="3" width="150" height="15" />
          <rect x="30" y="36" rx="10" ry="10" width="150" height="91" />
          <rect x="30" y="166" rx="3" ry="3" width="93" height="15" />
          <rect x="30" y="199" rx="8" ry="8" width="80" height="24" />
          <rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={onClickFavorite}
              src={
                addedToFavorite(cardId) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="Отсутствие лайка"
            />
          </div>
          <img
            className={styles.imgSneakers}
            width={133}
            height={112}
            src={imageUrl}
            alt="Sneakers"
          />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <button
              onClick={onClickPlus}
              className={`${styles.button} ${
                addedToCart(cardId) ? styles.button_background_green : ""
              }`}
            >
              <img src={addedToCart(cardId)? "/img/btn-checked.svg": "/img/plus.svg"} alt="плюс" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
