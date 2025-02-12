// project import
import dashboard from './dashboard';
import allListed from './allListed';
import hotelMenus from './hotelMenus';
import property from './property';
import restaurant from './restaurant';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, allListed],
  itemsHotel: [dashboard, hotelMenus],
  itemsProperty: [dashboard, property],
  itemsRestaurant: [dashboard, restaurant]
};

export default menuItems;
