import { User } from "@prisma/client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { getUser } from "@/queries/userQueries";
import { useQuery } from "react-query";

export type UserContextValue = {
  user: Partial<User> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  const { data, isError, error, isSuccess } = useQuery<User>(
    "userProfile",
    getUser
  );

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
