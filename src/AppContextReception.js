import React, { createContext, useContext, useState } from 'react';

const userStorage = JSON.parse(sessionStorage.getItem('user'));
const comStorage = JSON.parse(sessionStorage.getItem('com'));
const tokenStorage = JSON.parse(sessionStorage.getItem('token'));
const hotelIdStorage = JSON.parse(sessionStorage.getItem('Book'));

export const AppContext = createContext();

export default function AppContextReception({ children }) {
  const [user, setUser] = useState(userStorage);
  const [propertyUser, setPropertyUser] = useState([]);
  const [comId, setComId] = useState(comStorage);
  const [token, setToken] = useState(tokenStorage);
  const [lobbyData, setLobbyData] = useState([]);
  const [restaurantLists, setRestaurantLists] = useState([]);
  const [hotelViewId, setHotelViewId] = useState(hotelIdStorage);
  const [apartmentId, setApartmentId] = useState('');
  const [rentalId, setRentalId] = useState('');
  const [buildingId, setBuildingId] = useState('');

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        comId,
        setComId,
        token,
        setToken,
        lobbyData,
        setLobbyData,
        hotelViewId,
        setHotelViewId,
        propertyUser,
        setPropertyUser,
        apartmentId,
        setApartmentId,
        rentalId,
        setRentalId,
        buildingId,
        setBuildingId,
        restaurantLists,
        setRestaurantLists
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// const {propertyUser, setPropertyUser } = useAppContextReception();
// console.log(propertyUser);

export const useAppContextReception = () => {
  return useContext(AppContext);
};
