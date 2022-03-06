import { useEvent, useStore } from 'effector-react';
import { $appTheme, changeTheme } from '../models/app';

export const useToggleTheme = () => {
  const appTheme = useStore($appTheme);
  const changeThemeFn = useEvent(changeTheme);
  let isDarkMode: boolean = appTheme === 'themeDark'
    || (appTheme === 'themeSystem'
      && typeof window !== 'undefined'
      && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (): void => {
    const html = document.querySelector('html');
    if (!html) return;

    html.classList.remove('themeDefault');
    html.classList.remove(isDarkMode ? 'themeDark' : 'themeLight');
    html.classList.add(isDarkMode ? 'themeLight' : 'themeDark');
    changeThemeFn(isDarkMode ? 'themeLight' : 'themeDark');
    isDarkMode = !isDarkMode;
  };
};
