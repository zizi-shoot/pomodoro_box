import { app } from '../app';
import { PrimaryBtnText, SecondaryBtnText, WindowState } from '../../typings/TimerWindow';

export const $windowState = app.createStore<WindowState>('empty');
export const $primaryBtnText = app.createStore<PrimaryBtnText>('Старт');
export const $secondaryBtnText = app.createStore<SecondaryBtnText>('Стоп');

export const changeWindowState = app.createEvent<'primaryBtn' | 'secondaryBtn'>();
