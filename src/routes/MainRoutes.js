import { lazy, Suspense } from 'react';
import { Typography } from '@mui/material';

// project import
import MainLayout from 'layout/MainLayout';
import Waiting from 'pages/components-overview/Appointment/Waiting';
import Meeting from 'pages/components-overview/Appointment/Meeting';
import Visitors from 'pages/components-overview/Visitors';
import Loadable from 'components/Loadable';
import EventList from 'pages/components-overview/Event/EventList';
import CourierList from 'pages/components-overview/Courier/CourierList';
import MeetingCode from 'pages/components-overview/Appointment/MeetingCode';
import MeetingCheckOut from 'pages/components-overview/Appointment/MeetingCheckOut';
import CheckEvent from 'pages/components-overview/Event/CheckEvent';
import Courier from 'pages/components-overview/Courier/Courier';
import InstantMeeting from 'pages/components-overview/InstantMeeting/InstantMeeting';
import GuestList from 'pages/components-overview/Event/GuestList';
import PrivateRoutes from 'components/PrivateRoutes/PrivateRoutes';
import NotFoundPage from 'pages/components-overview/NotFoundPage';
import Document from 'pages/components-overview/Document';
import HotelBookingList from 'pages/components-overview-hotel/hotel/hotelBookingList/HotelBookingList';
import DoctorInstantMeeting from 'pages/components-overview/DoctorInstantMeeting/DoctorInstantMeeting';
import AddDoctorInstantMeeting from 'pages/components-overview/DoctorInstantMeeting/AddDoctorInstantMeeting';
import PropertyVisitors from 'pages/components-overview-property/visitors/PropertyVisitors';
import PhoneBook from 'pages/components-overview-property/phoneBook/PhoneBook';
import Scan from 'pages/components-overview-property/scan/Scan';
import Delivery from 'pages/components-overview-property/delivery/Delivery';
import PropertyList from 'pages/components-overview-property/propertyList/PropertyList';
import DeliveryList from 'pages/components-overview-property/delivery/DeliveryList';
const HotelView = Loadable(lazy(() => import('pages/components-overview-hotel/hotel/hotelBookingList/HotelView')));
const HotelCheckIn = Loadable(lazy(() => import('pages/components-overview-hotel/hotel/hotel-checkIn/HotelCheckIn')));

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
      path: 'MeetingCheckOut',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <MeetingCheckOut />
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
      path: 'document',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Document />
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
      path: 'hotelCheckIn',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <HotelCheckIn />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'hotelBookingList',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <HotelBookingList />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'hotelView',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <HotelView />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'patientInstantMeeting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <DoctorInstantMeeting />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'addInstantDoctorMeeting',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <AddDoctorInstantMeeting />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'visitors',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <PropertyVisitors />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'delivery',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Delivery />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'scan',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <Scan />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'phoneBook',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <PhoneBook />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'propertyList',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <PropertyList />
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'listOfCourier',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <PrivateRoutes>
            <DeliveryList />
          </PrivateRoutes>
        </Suspense>
      )
    }
  ]
};

export default MainRoutes;
