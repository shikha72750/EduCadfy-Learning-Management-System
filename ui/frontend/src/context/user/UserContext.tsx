import { createContext, useState } from "react"; 
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(undefined); 

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }as any}>
      {children}
    </UserContext.Provider>
  );
};