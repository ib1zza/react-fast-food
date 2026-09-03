export * from "./types/auth";
export * from "./types/catalog";

export interface IOutlineButton {
  background: string;
  color: string;
  children: React.ReactNode;
  className: string;
}

export interface ISolidButton {
  background: string;
  color: string;
  children: React.ReactNode;
  className: string;
}

export type IModal = "login" | "register" | "cart";
