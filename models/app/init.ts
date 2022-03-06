import { guard, sample } from 'effector';
import {
  $appTheme,
  $isAllowedNotifications,
  changeTheme,
  initApp,
  setIsAllowedNotifications,
  setThemeToLSFx,
} from './index';

$appTheme.on(changeTheme, (_, value) => value);
setThemeToLSFx.use((value) => {
  if (typeof value !== 'string') return;

  localStorage.setItem('appTheme', value);
});

$isAllowedNotifications.on(setIsAllowedNotifications, (_, value) => value);

sample({
  clock: guard({
    clock: initApp,
    filter: () => window.matchMedia('(prefers-color-scheme: dark)').matches || !!localStorage.getItem('appTheme'),
  }),
  fn: () => localStorage.getItem('appTheme') ?? 'themeSystem',
  // @ts-ignore
  target: changeTheme,
});

guard({
  source: changeTheme,
  clock: $appTheme,
  filter: (_, appTheme) => !document.querySelector('html')?.classList.contains('themeDefault')
    && appTheme !== 'themeSystem',
  target: setThemeToLSFx,
});
