// project import
import dashboard from './dashboard';
import allListed from './allListed';
import hotelMenus from './hotelMenus';
import property from './property';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, allListed],
  itemsHotel: [dashboard, hotelMenus],
  itemsProperty: [dashboard, property]
};

export default menuItems;
