import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../contexts/AppContext";

function Home({ searchValue, setSearchValue, onChangeSearchInput }) {
  const { isLoading, items } = React.useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card key={index} loading={isLoading} {...item} />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Поиск" />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className="clear"
              src="img/remove-sneakers.svg"
              alt="Отчистка инпута"
            />
          )}
          <input
            value={searchValue}
            name="search"
            type="text"
            onChange={onChangeSearchInput}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>
      <div className="cardTable">{renderItems()}</div>
    </div>
  );
}

export default Home;
