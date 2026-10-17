import { useSearchStore } from "../../../store/useSearchStore";
import { useModalStore } from "../../../store/useModalStore";

export function HeaderSearch() {
  const { searchResults } = useSearchStore();
  const { setModalOpened } = useModalStore();
  return (
    <div className="search-results">
      {searchResults.map((item) => (
        <div className="search-item" onClick={() => setModalOpened("item", item)}>
          <img src={item.image} alt={item.name} className="search-item-img" />
          <div className="search-item-text">
            <div className="search-item-name">{item.name}</div>
            <div className="search-item-price">{item.priceText}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
