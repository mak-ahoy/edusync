// assets
import { IconBrandChrome, IconHelp, IconTextCaption , IconFileTypeDocx} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconFileTypeDocx };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Text Editor',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconFileTypeDocx,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
