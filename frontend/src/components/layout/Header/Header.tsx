import { Button } from "../../ui/Button/Button"
import { Icon } from "../../ui/Icon/Icon"

import './Header.css'

export function ShowHeader() {
  console.log("header is exporting successfully")
  return (
    <div className="header">
      <div className="header-logo">
        <button>
          <img src="/images/logo.png" alt="Logo" />
        </button>
      </div>
      <div className="header-buttons">
        <div>
          <Button variant="outline" square>
            <Icon name="search" size={16} className="search-icon"  />
          </Button>


           
        </div>
        <div className="cart-button">
          <Button variant="solid">
           корзина
          </Button>

 <Button variant="solid" size='s'>
           корзина
          </Button>

<Button variant="solid" size='l'>
           корзина
          </Button>
        </div>
      </div>
    </div>
  )
}
