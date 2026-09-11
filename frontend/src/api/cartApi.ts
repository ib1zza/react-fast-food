import { IBackendCart } from "../types";

export async function getCart(): Promise<IBackendCart | null> {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) return null;

    const res = await fetch("http://localhost:3001/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await res.json();
    return data as IBackendCart;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function addToCart(
  productId: string,
  quantity: number,
): Promise<IBackendCart | null> {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) return null;

    const res = await fetch("http://localhost:3001/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as IBackendCart;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function editQuantity(
  productId: string,
  quantity: number,
): Promise<IBackendCart | null> {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) return null;

    const res = await fetch(`http://localhost:3001/cart/items/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as IBackendCart;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function deleteFromCart(
  productId: string,
): Promise<IBackendCart | null> {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) return null;

    const res = await fetch(`http://localhost:3001/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as IBackendCart;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}
