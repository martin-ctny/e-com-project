import TokenService from "@/services/token.service";
import UserService from "@/services/user.service";
import { User, UserTypeContext } from "@/types/user/user.type";
import { useState, createContext, useEffect } from "react";

const UserContext = createContext({} as UserTypeContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, [setUser]);

  const getUser = async () => {
    try {
      const userId: any = await TokenService.getUserFromLocalStorage();
      const user = await UserService.getOneUser(userId.sub);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
