import React, { createContext, useContext, useState } from 'react';

const userStorage = JSON.parse(sessionStorage.getItem('user'));
const comStorage = JSON.parse(sessionStorage.getItem('com'));
const tokenStorage = JSON.parse(sessionStorage.getItem('token'));
const hotelIdStorage = JSON.parse(sessionStorage.getItem('Book'));



export const AppContext = createContext();

export default function AppContextReception({ children }) {
  const [user, setUser] = useState(userStorage);
  const [comId, setComId] = useState(comStorage);
  const [token, setToken] = useState(tokenStorage);
  const [lobbyData, setLobbyData] = useState([]);
  const [hotelViewId, setHotelViewId] = useState(hotelIdStorage);
  return <AppContext.Provider value={{ user, setUser, comId, setComId ,token, setToken,lobbyData, setLobbyData,hotelViewId, setHotelViewId}}>{children}</AppContext.Provider>;
}

export const useAppContextReception = () => {
  return useContext(AppContext);
};
