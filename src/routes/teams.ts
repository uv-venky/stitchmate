import type { ServerTeam } from 'uv-core';

export const serverTeams: ServerTeam[] = [
  {
    name: 'Stitchmate CC',
    logo: 'admin',
    teamPath: '',
    oneLevelNav: [
      { title: 'Dashboard', pagePath: '/dashboard', icon: 'default', roles: ['user', 'admin'] },
      { title: 'Code Generator', pagePath: '/codegen', icon: 'settings', roles: ['admin', 'root'] },
    ],
    modules: [
      {
        title: 'Management',
        modulePath: '/admin',
        pageGroups: [
          {
            title: 'Control',
            groupPath: '',
            icon: 'admin',
            pages: [
              { title: 'Settings', pagePath: '/settings', icon: 'settings', roles: ['admin', 'root'] },
              { title: 'Code Generator', pagePath: '/codegen', icon: 'settings', roles: ['admin', 'root'] },
            ],
          },
        ],
      },
      {
        title: 'App',
        modulePath: '/app',
        pageGroups: [
          {
            title: 'General',
            groupPath: '',
            icon: 'default',
            pages: [
              { title: 'Users', pagePath: '/uv-users', icon: 'default', roles: ['admin', 'root'] },
            ],
          },
          {
            title: 'Configuration',
            groupPath: '/config',
            icon: 'settings',
            pages: [
              { title: 'Roles', pagePath: '/uv-roles', icon: 'default', roles: ['admin', 'root'] },
            ],
          },
        ],
      },
    ],
  },
];
