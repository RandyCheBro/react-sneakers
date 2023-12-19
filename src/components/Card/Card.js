import React from "react";
import styles from "./Card.module.scss";

function Card({ title, price, imageUrl, cardId, onPlus, onFavorite }) {
  const [plusImageUrl, setPlusImageUrl] = React.useState("/img/plus.svg");
  const [isBtnChecked, setBtnIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (!isBtnChecked) {
      setPlusImageUrl("/img/plus.svg");
    } else {
      setPlusImageUrl("/img/btn-checked.svg");
    }
  }, [isBtnChecked]);

  const onClickPlus = () => {
    onPlus({title, price, imageUrl, cardId});
    setBtnIsChecked(!isBtnChecked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onFavorite}
          src="/img/heart-liked.svg"
          alt="Отсутствие лайка"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button
          onClick={onClickPlus}
          className={`${styles.button} ${
            isBtnChecked ? styles.button_background_green : ""
          }`}
        >
          <img src={plusImageUrl} alt="плюс" />
        </button>
      </div>
    </div>
  );
}

export default Card;
