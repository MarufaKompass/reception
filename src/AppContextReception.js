import React, { createContext, useContext, useState } from 'react';

const tokenStorage = JSON.parse(sessionStorage.getItem('token'));
const comStorage = JSON.parse(sessionStorage.getItem('com'));

export const AppContext = createContext();

export default function AppContextReception({ children }) {
  const [user, setUser] = useState(tokenStorage);

  const [comId, setComId] = useState(comStorage);

  return <AppContext.Provider value={{ user, setUser, comId, setComId }}>{children}</AppContext.Provider>;
}

export const useAppContextReception = () => {
  return useContext(AppContext);
};
