import { lazy, Suspense } from 'react';

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
import PrivateRoutes from 'components/PrivateRoutes/PrivateRoutes';
import NotFoundPage from 'pages/components-overview/NotFoundPage';
import { Typography } from '@mui/material';
import Test from 'pages/components-overview/Test';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const MainRoutes = {
  path: '/',
  element: (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    </Suspense>
  ),
  children: [
    {
      path: '/',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <DashboardDefault />
        </Suspense>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: (
            <Suspense fallback={<Typography>Loading...</Typography>}>
              <PrivateRoutes>
                <DashboardDefault />
              </PrivateRoutes>
            </Suspense>
          )
        }
      ]
    },
    {
      path: 'waiting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Waiting />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Meeting />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'visitor',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Visitors />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'event',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <EventList />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'courierList',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <CourierList />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'checkMeeting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <MeetingCode />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'checkEvent',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <CheckEvent />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'event/guestlist/:idxe',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <GuestList />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'instantMeeting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <InstantMeeting />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'courier',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Courier />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <NotFoundPage />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'test',
      element: <Test />
    }
  ]
};

export default MainRoutes;
