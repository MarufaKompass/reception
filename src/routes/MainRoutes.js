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
import Home from 'pages/components-overview/Home';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));

const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
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
      path: 'courier',
      element: <Courier />
    },

    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
