// assets
import dashboardIcon from '../components/svg/Dashboard';

// icons
const icons = {
  dashboardIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboardIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
