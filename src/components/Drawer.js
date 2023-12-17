function Drawer() {
  return (
    <div className="overlay" style={{ display: "none" }}>
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="removeBtn"
            src="/img/remove-sneakers.svg"
            alt="Удаление"
          />
        </h2>

        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div
              className="cartImage"
              style={{ backgroundImage: "url(/img/sneakers/2.jpg)" }}
            ></div>
            <div className="cartInfo mr-20">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className="removeBtn"
              src="/img/remove-sneakers.svg"
              alt="Удаление"
            />
          </div>

          <div className="cartItem d-flex align-center">
            <div
              className="cartImage"
              style={{ backgroundImage: "url(/img/sneakers/2.jpg)" }}
            ></div>
            <div className="cartInfo mr-20">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className="removeBtn"
              src="/img/remove-sneakers.svg"
              alt="Удаление"
            />
          </div>
        </div>

        <div className="price d-flex flex-column">
          <ul>
            <li className="d-flex align-center mb-20">
              <p>Итого:</p>
              <div className="dashedBorder"></div>
              <b>21 498 руб.</b>
            </li>

            <li className="d-flex align-center">
              <p>Налог 5%:</p>
              <div className="dashedBorder"></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenBtn">
            Оформить заказ
            <img className="imgArrow" src="/img/arrow.svg" alt="Стрелочка" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
