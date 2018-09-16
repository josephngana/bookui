import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Book Dashboard',
    icon: 'nb-home',
    link: '/bookui/book-dashboard',
    home: true,
  },
  {
    title: 'User Dashboard',
    icon: 'nb-person',
    link: '/bookui/user-dashboard',
  },
  {
    title: 'E-Commerce Dashboard',
    icon: 'nb-e-commerce',
    link: '/bookui/dashboard',
  },
  {
    title: 'IOT Dashboard',
    icon: 'nb-',
    link: '/bookui/iot-dashboard',
  },
  {
    title: 'ADMINISTRATION',
    group: true,
  },
  {
    title: 'Role Management',
    icon: 'nb-flame-circled',
    link: '/bookui/admin/role-management',
    children: [],
  },
  {
    title: 'User Management',
    icon: 'nb-gear',
    link: '/bookui/admin/user-management',
    children: [],
  },
  {
    title: 'Book Management',
    icon: 'nb-star',
    link: '/bookui/admin/book-management',
    children: [
      {
        title: 'Book',
        link: '/bookui/admin/book-management/book',
      },
      {
        title: 'Chapter',
        link: '/bookui/admin/book-management/chapter',
      },
      {
        title: 'Section',
        link: '/bookui/admin/book-management/section',
      },
      {
        title: 'Subsection',
        link: '/bookui/admin/book-management/subsection',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/bookui/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/bookui/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/bookui/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/bookui/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/bookui/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/bookui/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/bookui/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/bookui/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/bookui/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/bookui/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/bookui/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/bookui/components/tree',
      }, {
        title: 'Notifications',
        link: '/bookui/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/bookui/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/bookui/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/bookui/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/bookui/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/bookui/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/bookui/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/bookui/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/bookui/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/bookui/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/bookui/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/bookui/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
