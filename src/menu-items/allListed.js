import waitingList from '../../src/components/svg/WaitingList';
import meetingList from '../../src/components/svg/MeetingList';
import visitorList from '../../src/components/svg/VisitorList';
import courier from '../../src/components/svg/Courier';
import event from '../../src/components/svg/Event';
import checkIn from '../../src/components/svg/CheckIn';
import checkOut from '../../src/components/svg/CheckOut';
import instantMeeting from '../../src/components/svg/InstantMeeting';
import DashboardDoctorUser from '../../src/components/svg/DashboardDoctorUser';

const icons = {
  waitingList,
  meetingList,
  visitorList,
  courier,
  event,
  checkIn,
  checkOut,
  instantMeeting,
  DashboardDoctorUser
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const allListed = {
  id: 'list',
  title: 'list',
  type: 'group',
  children: [
    {
      id: 'checkIn',
      title: 'Meeting Check In',
      type: 'item',
      url: '/checkMeeting',
      icon: icons.checkIn
    },
    {
      id: 'CheckOut',
      title: 'Meeting Check Out',
      type: 'item',
      url: '/MeetingCheckOut',
      icon: icons.checkOut
    },
    {
      id: 'instantMeeting',
      title: 'Instant Meeting',
      type: 'item',
      url: '/instantMeeting',
      icon: icons.instantMeeting
    },
    {
      id: 'instantPatientsAppointment',
      title: 'Instant Doctor Appointment',
      type: 'item',
      url: '/patientInstantMeeting',
      icon: icons.DashboardDoctorUser
    },
    {
      id: 'waitingList',
      title: "Today's Waiting List",
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



