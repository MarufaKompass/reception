// assets

import waitingList from '../components/svg/WaitingList';
import meetingList from '../components/svg/MeetingList';
import visitorList from '../components/svg/VisitorList';
import courier from '../components/svg/Courier';
import event from '../components/svg/Event';
import checkIn from '../components/svg/CheckIn';
import checkOut from '../components/svg/CheckOut';
import instantMeeting from '../components/svg/InstantMeeting';
// import event from "../../src/components/svg/Event";
// icons
const icons = {
  waitingList,
  meetingList,
  visitorList,
  courier,
  event,
  checkIn,
  checkOut,
  instantMeeting
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const hotelMenus = {
  id: 'list',
  title: 'list',
  type: 'group',
  children: [
    {
      id: 'hotelBook',
      title: 'Hotel Booking List',
      type: 'item',
      url: '/hotelBookingList',
      icon: icons.checkIn
    }
  ]
};

export default hotelMenus;
