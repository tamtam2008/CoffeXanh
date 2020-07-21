import { useLinking } from '@react-navigation/native';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: ['/'],
    config: {
      Root: {
        path: 'root',
        screens: {
          bottomTabs: {
            path: 'bottomTabs',
            screens: {
              home: 'home',
              menu: 'menu',
              store: 'store',
              account: 'account',
            },
          },
          links: 'links',
        },
      },
    },
  });
}
