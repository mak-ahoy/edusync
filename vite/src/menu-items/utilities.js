// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Text1',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Text2',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Text3',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
