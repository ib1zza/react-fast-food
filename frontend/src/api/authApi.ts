import { IRegisterResponse } from "../types";

export async function registerUser(email: string, password: string) {
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
  }
}
