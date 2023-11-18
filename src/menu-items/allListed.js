// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
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
      icon: icons.FontSizeOutlined
    },
    {
      id: 'meeting',
      title: "Today's Meeting List",
      type: 'item',
      url: '/meeting',
      icon: icons.AntDesignOutlined
    },
    {
      id: 'visitor',
      title: "Today's Visitor List",
      type: 'item',
      url: '/visitor',
      icon: icons.AntDesignOutlined
    },
    {
      id: 'courier',
      title: 'Courier',
      type: 'item',
      url: '/courierList',
      icon: icons.AntDesignOutlined
    },
    {
      id: 'event',
      title: 'Event',
      type: 'item',
      url: '/event',
      icon: icons.AntDesignOutlined
    }
  ]
};

export default allListed;
