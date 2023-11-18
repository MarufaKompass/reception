// assets

import waitingList from '../../src/components/svg/WaitingList';
import meetingList from '../../src/components/svg/MeetingList';
import visitorList from '../../src/components/svg/VisitorList';
import courier from '../../src/components/svg/Courier';
import event from '../../src/components/svg/Event';
// import event from "../../src/components/svg/Event";
// icons
const icons = {
  waitingList,
  meetingList,
  visitorList,
  courier,
  event
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const allListed = {
  id: 'list',
  title: 'list',
  type: 'group',
  children: [
    {
      id: 'waitingList',
      title: "Today's waiting List",
      type: 'item',
      url: '/waiting',
      icon: icons.waitingList
    },
    {
      id: 'meeting',
      title: "Today's Meeting List",
      type: 'item',
      url: '/meeting',
      icon: icons.meetingList
    },
    {
      id: 'visitor',
      title: "Today's Visitor List",
      type: 'item',
      url: '/visitor',
      icon: icons.visitorList
    },
    {
      id: 'courier',
      title: 'Courier',
      type: 'item',
      url: '/courierList',
      icon: icons.courier
    },
    {
      id: 'event',
      title: 'Event',
      type: 'item',
      url: '/event',
      icon: icons.event
    }
  ]
};

export default allListed;
