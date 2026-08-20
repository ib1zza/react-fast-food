import { useUserStore } from "../store/useUserStore";

export const useUser = () => {
  const { setUser, user } = useUserStore();

  return {
    setUser,
    user,
  };
};
