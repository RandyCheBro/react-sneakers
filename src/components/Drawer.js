function Drawer({onClose, items = []}) {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn"
            src="/img/remove-sneakers.svg"
            alt="Закрытие"
          />
        </h2>

        <div className="items">

          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                className="cartImage"
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
              ></div>
              <div className="cartInfo mr-20">
                <p>{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img
                className="removeBtn"
                src="/img/remove-sneakers.svg"
                alt="Удаление"
              />
            </div>
          ))}

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
