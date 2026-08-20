import { Button } from "../ui/Button/Button.tsx"

export function ShowHeader() {
  console.log("header is exporting successfully")
  return (
    <div className="header">
      <div className="header-logo">
        <button>
          <img src="../public/images/logo.png" />
        </button>
      </div>
      <div className="header-buttons">
        <div>
          <Button variant="outline" square={true}>
            <div>
              <img src="./public/images/search-icon.png" alt="" />
            </div>
          </Button>
        </div>
        <div className="cart-button">
          <Button variant="solid">
            <div className="cart-info"></div>
            <img src="" alt="" />
          </Button>
        </div>
      </div>
    </div>
  )
}