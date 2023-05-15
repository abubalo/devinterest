import { User } from "@prisma/client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { getUser } from "@/queries/userQueries";
import { useQuery } from "react-query";

export type UserContextValue = {
  user: Partial<User> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User> | null>({});
  
  const { data, isError, error, isSuccess } = useQuery<User>(
    "userProfile",
    getUser
  );

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }

  }, [isSuccess, data]);

  console.log("Data:", data);
  console.log("isSuccess:", isSuccess);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
