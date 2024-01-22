import React from 'react'
import { useAppContextReception } from 'AppContextReception';
export default function HotelView() {
    const { lobbyData } = useAppContextReception();

   console.log(lobbyData);
  return (
    <div>HotelView</div>
  )
}
