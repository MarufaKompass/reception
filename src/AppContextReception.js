import React, { createContext, useContext, useState } from 'react';

const tokenStorage = JSON.parse(sessionStorage.getItem('token'));

export const AppContext = createContext();

export default function AppContextReception({ children }) {
  const [user, setUser] = useState(tokenStorage);

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}

export const useAppContextReception = () => {
  return useContext(AppContext);
};
