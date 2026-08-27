import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { fetchUser } from "../api/authApi";

export const useUser = () => {
  const { setUser, user } = useUserStore();

  async function getUserData() {
    const data = await fetchUser();

    if (data?.user) {
      setUser(data.user);
    }
  }

  useEffect(() => {
    if (!user) getUserData();
  }, [user]);

  return {
    setUser,
    user,
    getUserData,
  };
};
