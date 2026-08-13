import { IOutlineButton, ISolidButton } from "../../types.ts"

export const OutlineButton = ({ children, background, color, }: IOutlineButton) => {
  return (
    <div>
      <button background-color={background} color={color}>
        {children}
      </button>
    </div>
  )
}

export const SolidButton = ({ children, background, color }: ISolidButton) => {
  return (
    <div>
      <button background-color={background} color={color}>
        {children}
      </button>
    </div>
  )
}