import { OutlineButton, SolidButton } from "./ButtonsTemplates"

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
          <OutlineButton className="search-button" background="#FCF6EC" color="" >
            <div>
              <img src="./public/images/search-icon.png" alt="" />
            </div>
          </OutlineButton>
        </div>
        <div className="cart-button">
          <SolidButton background={""} color={""} className={""} >
            <div className="cart-info"></div>
            <img src="" alt="" />
          </SolidButton>
        </div>
      </div>
    </div>
  )
}