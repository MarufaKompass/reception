// assets

import meetingList from '../components/svg/MeetingList';

import checkIn from '../components/svg/CheckIn';

// import event from "../../src/components/svg/Event";
// icons
const icons = {
  meetingList,
  checkIn
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const restaurant = {
  id: 'list',
  title: 'list',
  type: 'group',
  children: [
    {
      id: 'restaurantCheckIn',
      title: 'Restaurant Check In',
      type: 'item',
      url: '/restaurantCheckIn',
      icon: icons.checkIn
    },
    {
      id: 'restaurantBook',
      title: 'Restaurant Booking List',
      type: 'item',
      url: '/restaurantBookingList',
      icon: icons.meetingList
    },
  ]
};

export default restaurant;
