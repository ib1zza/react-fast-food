import { IAuthResponse, IRegisterResponse } from "../types";

export async function registerUser(
  email: string,
  password: string,
): Promise<IRegisterResponse | null> {
  try {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as IRegisterResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<IRegisterResponse | null> {
  try {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as IRegisterResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function fetchUser(): Promise<IAuthResponse | null> {
  try {
    const token = localStorage.getItem("token") || "";

    if (!token) return null;

    const res = await fetch("http://localhost:3001/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await res.json();
    return data as IAuthResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}
