import { createDomain } from 'effector';
import { AppTheme } from '../../typings';

export const app = createDomain();

export const $appTheme = app.createStore<AppTheme>('themeLight');

export const initApp = app.createEvent();
export const changeTheme = app.createEvent<AppTheme>();
export const setThemeToLSFx = app.createEffect();
