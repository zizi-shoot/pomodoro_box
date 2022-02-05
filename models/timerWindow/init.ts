import { sample } from 'effector';
import {
  $timerState,
  resetBreakingTimer,
  resetWorkingTimer,
  startBreakingTimer,
  startWorkingTimer,
  stopTimer,
} from '../timers';
import {
  $primaryBtn,
  $secondaryBtn,
  $timerType,
  changeTimerType,
} from './index';
import { ButtonMapping } from '../../typings';

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
        event: resetWorkingTimer,
        type: 'work',
        state: 'new',
      },
    },
    started: {
      primary: {
        name: 'Пауза',
        event: stopTimer,
        type: 'pause',
        state: 'started',
      },
      secondary: {
        name: 'Стоп',
        event: resetWorkingTimer,
        type: 'work',
        state: 'new',
      },
    },
  },
  pause: {
    started: {
      primary: {
        name: 'Продолжить',
        event: startWorkingTimer,
        type: 'work',
        state: 'started',
      },
      secondary: {
        name: 'Сделано',
        event: startWorkingTimer,
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
        event: resetBreakingTimer,
        type: 'work',
        state: 'new',
      },
    },
    started: {
      primary: {
        name: 'Пауза',
        event: stopTimer,
        type: 'break',
        state: 'paused',
      },
      secondary: {
        name: 'Пропустить',
        event: resetBreakingTimer,
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
