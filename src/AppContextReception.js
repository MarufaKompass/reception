import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export default function AppContextReception({ children }) {
  const [user, setUser] = useState('');
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}

export const useAppContextReception = () => {
  return useContext(AppContext);
};
