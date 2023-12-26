import Card from "../components/Card/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddtoCart,
  onFavorite,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={onAddtoCart}
        onFavorite={onFavorite}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Поиск" />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className="clear"
              src="/img/remove-sneakers.svg"
              alt="Отчистка инпута"
            />
          )}
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>
      <div className="cardTable d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
