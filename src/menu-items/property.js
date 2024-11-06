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

const property = {
  id: 'list',
  title: 'list',
  type: 'group',
  children: [
    {
      id: 'visitors',
      title: 'visitors',
      type: 'item',
      url: '/#',
      icon: icons.checkIn
    },
    {
      id: 'delivery',
      title: 'Delivery',
      type: 'item',
      url: '/#1',
      icon: icons.checkIn
    },
    {
      id: 'scan',
      title: 'Scan',
      type: 'item',
      url: '/#2',
      icon: icons.checkIn
    },
    {
      id: 'phoneBook',
      title: 'Phone Book',
      type: 'item',
      url: '/#3',
      icon: icons.checkIn
    }
  ]
};

export default property;
