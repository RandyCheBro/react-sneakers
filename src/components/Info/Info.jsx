import React from "react";
import styles from "../Drawer/Drawer.module.scss";
import { AppContext } from "../../contexts/AppContext";

function Info({ isOrderComplete, title, descripton, image }) {
  const { setIsCartOpened } = React.useContext(AppContext);

  return (
    <div className={styles.emptyCart}>
      <img height={120} src={image} alt="Коробка" />
      <h3 className={isOrderComplete? styles.greenTitle: ""}>{title}</h3>
      <p>{descripton}</p>
      <button className="greenBtn" onClick={() => setIsCartOpened(false)}>
        Вернуться назад
        <img
          className="imgLeftArrow"
          src="img/arrow-left.svg"
          alt="Стрелочка"
        />
      </button>
    </div>
  );
}

export default Info;
