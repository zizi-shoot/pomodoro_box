import { sample } from 'effector';
import {
  $timerState,
  skipWorkingTimer,
  startBreakingTimer,
  pauseWorkingTimer,
  startWorkingTimer,
  stopBreakingTimer,
  restartWorkingTimer, skipBreakingTimer,
} from '../timers';
import {
  $primaryBtn,
  $secondaryBtn,
  $timerType,
  changeTimerType,
} from './index';
import { ButtonMapping } from '../../types';

const buttonMapping: ButtonMapping = {
  work: {
    new: {
      primary: {
        name: 'Старт',
        event: startWorkingTimer,
        type: 'work',
        state: 'started',
      },
      secondary: {
        name: 'Стоп',
        event: skipWorkingTimer,
        type: 'work',
        state: 'new',
      },
    },
    started: {
      primary: {
        name: 'Пауза',
        event: pauseWorkingTimer,
        type: 'pause',
        state: 'started',
      },
      secondary: {
        name: 'Стоп',
        event: skipWorkingTimer,
        type: 'work',
        state: 'new',
      },
    },
  },
  pause: {
    started: {
      primary: {
        name: 'Продолжить',
        event: restartWorkingTimer,
        type: 'work',
        state: 'started',
      },
      secondary: {
        name: 'Сделано',
        event: restartWorkingTimer,
        type: 'work',
        state: 'started',
      },
    },
  },
  break: {
    new: {
      primary: {
        name: 'Старт',
        event: startBreakingTimer,
        type: 'break',
        state: 'started',
      },
      secondary: {
        name: 'Пропустить',
        event: skipBreakingTimer,
        type: 'work',
        state: 'new',
      },
    },
    started: {
      primary: {
        name: 'Пауза',
        event: stopBreakingTimer,
        type: 'break',
        state: 'paused',
      },
      secondary: {
        name: 'Пропустить',
        event: skipBreakingTimer,
        type: 'work',
        state: 'new',
      },
    },
  },
};

$timerType.on(changeTimerType, (_, value) => value);

sample({
  source: [$timerType, $timerState],
  fn: ([type, state]) => buttonMapping[type][state]?.primary,
  // @ts-ignore
  target: $primaryBtn,
});

sample({
  source: [$timerType, $timerState],
  fn: ([type, state]) => buttonMapping[type][state]?.secondary,
  // @ts-ignore
  target: $secondaryBtn,
});
