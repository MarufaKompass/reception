import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Waiting from 'pages/components-overview/Appointment/Waiting';
import Meeting from 'pages/components-overview/Appointment/Meeting';
import Visitors from 'pages/components-overview/Visitors';
import EventList from 'pages/components-overview/Event/EventList';
import CourierList from 'pages/components-overview/Courier/CourierList';
import MeetingCode from 'pages/components-overview/Appointment/MeetingCode';
import CheckEvent from 'pages/components-overview/Event/CheckEvent';
import Courier from 'pages/components-overview/Courier/Courier';
import InstantMeeting from 'pages/components-overview/InstantMeeting/InstantMeeting';
import GuestList from 'pages/components-overview/Event/GuestList';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'waiting',
      element: <Waiting />
    },
    {
      path: 'meeting',
      element: <Meeting />
    },
    {
      path: 'visitor',
      element: <Visitors />
    },
    {
      path: 'event',
      element: <EventList />
    },
    {
      path: 'courierList',
      element: <CourierList />
    },
    {
      path: 'checkMeeting',
      element: <MeetingCode />
    },
    {
      path: 'checkEvent',
      element: <CheckEvent />
    },
    {
      path: 'event/guestlist/:idxe',
      element: <GuestList />
    },
    {
      path: 'instantMeeting',
      element: <InstantMeeting />
    },
    {
      path: 'courier',
      element: <Courier />
    }
  ]
};

export default MainRoutes;
