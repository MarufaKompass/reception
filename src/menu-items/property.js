// assets

import propertyVisitors from '../components/svg/PropertyVisitors';
import propertyDelivery from '../components/svg/PropertyDelivery';
import propertyScanner from '../components/svg/PropertyScanner';
import propertyPhoneBook from '../components/svg/PropertyPhoneBook';
// import event from "../../src/components/svg/Event";
// icons
const icons = {
  propertyVisitors,
  propertyDelivery,
  propertyScanner,
  propertyPhoneBook
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
      url: '/visitors',
      icon: icons.propertyVisitors
    },
    {
      id: 'delivery',
      title: 'Delivery',
      type: 'item',
      url: '/delivery',
      icon: icons.propertyDelivery
    },
    {
      id: 'scan',
      title: 'Code Scan',
      type: 'item',
      url: '/scan',
      icon: icons.propertyScanner
    },
    {
      id: 'phoneBook',
      title: 'Phone Book',
      type: 'item',
      url: '/phoneBook',
      icon: icons.propertyPhoneBook
    }
  ]
};

export default property;
