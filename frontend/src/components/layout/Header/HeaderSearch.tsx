import { useSearchStore } from "../../../store/useSearchStore";

export function HeaderSearch() {
  const { searchResults } = useSearchStore();
  return (
    <div className="search-wrapper">
      {
        searchResults.map((item) => (
          <div className="search-item">
            <div className="search-item-img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="search-item-text">
              <div className="search-item-name">{item.name}</div>
              <div className="search-item-price">{item.priceText}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}