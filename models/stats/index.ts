import { app } from '../app';
import { SelectedPeriod } from '../../types';

export const $selectedPeriod = app.createStore<SelectedPeriod>({ value: 'current', label: 'Эта неделя' });
export const $selectedDay = app.createStore('');

export const setSelectedPeriod = app.createEvent<SelectedPeriod>();
export const setSelectedDay = app.createEvent<string>();
