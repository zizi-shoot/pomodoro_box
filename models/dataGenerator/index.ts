import { app } from '../app';
import { StatsCounter } from '../../typings';

export const generateWorkTime = app.createEvent<StatsCounter>();
export const generatePauseTime = app.createEvent<StatsCounter>();
export const generateFinishedTimers = app.createEvent<StatsCounter>();
export const generateStops = app.createEvent<StatsCounter>();
