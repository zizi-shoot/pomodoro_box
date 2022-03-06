import { createDomain } from 'effector';
import { AppTheme } from '../../types';

export const app = createDomain();

export const $appTheme = app.createStore<AppTheme>('themeSystem');
export const $isAllowedNotifications = app.createStore(true);

export const initApp = app.createEvent();
export const changeTheme = app.createEvent<AppTheme>();
export const setIsAllowedNotifications = app.createEvent<boolean>();
export const setThemeToLSFx = app.createEffect();
