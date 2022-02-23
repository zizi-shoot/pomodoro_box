import { useEvent, useStore } from 'effector-react';
import { $appTheme, changeTheme } from '../models/app';

export const useToggleTheme = () => {
  const appTheme = useStore($appTheme);
  const changeThemeFn = useEvent(changeTheme);
  let darkMode: boolean = appTheme === 'themeDark';

  return (): void => {
    const html = document.querySelector('html');
    if (!html) return;

    html.classList.remove('themeDefault');
    html.classList.remove(darkMode ? 'themeDark' : 'themeLight');
    html.classList.add(darkMode ? 'themeLight' : 'themeDark');
    changeThemeFn(darkMode ? 'themeLight' : 'themeDark');
    darkMode = !darkMode;
  };
};
