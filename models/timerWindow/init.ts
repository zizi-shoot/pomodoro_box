import { guard, sample } from 'effector';
import {
  $primaryBtnText,
  $secondaryBtnText,
  $windowState,
  changeWindowState,
} from './index';
import { PrimaryBtnText, SecondaryBtnText, WindowState } from '../../typings/TimerWindow';
import {
  $pomodoroTime,
  resetTimer,
  startTimer,
  stopTimer,
} from '../timers';
import { $notCompletedTasks, $tasks, completeTask } from '../tasks';

const primaryBtnText: Map<WindowState, PrimaryBtnText> = new Map([
  ['empty', 'Старт'],
  ['new', 'Старт'],
  ['started', 'Пауза'],
  ['paused', 'Продолжить'],
  ['newBreak', 'Старт'],
  ['startedBreak', 'Пауза'],
]);
const secondaryBtnText: Map<WindowState, SecondaryBtnText> = new Map([
  ['empty', 'Стоп'],
  ['new', 'Стоп'],
  ['started', 'Стоп'],
  ['paused', 'Сделано'],
  ['newBreak', 'Пропустить'],
  ['startedBreak', 'Пропустить'],
]);

$windowState.on(changeWindowState, (state, value) => {
  const isPrimaryBtn = value === 'primaryBtn';

  if (!isPrimaryBtn) return state === 'paused' ? 'started' : 'new';

  const returnValues: Map<WindowState, WindowState> = new Map([
    ['new', 'started'],
    ['started', 'paused'],
    ['paused', 'started'],
    ['newBreak', 'startedBreak'],
    ['startedBreak', 'new'],
  ]);

  return returnValues.get(state);
});

$windowState.on($tasks, (currentState, tasks) => {
  if (tasks.length && currentState === 'empty') return 'new';
  if (tasks.length) return currentState;

  return 'empty';
});

sample({
  source: $windowState,
  fn: (state) => primaryBtnText.get(state),
  // @ts-ignore
  target: $primaryBtnText,
});

sample({
  source: $windowState,
  fn: (state) => secondaryBtnText.get(state),
  // @ts-ignore
  target: $secondaryBtnText,
});

guard({
  source: $pomodoroTime,
  clock: $windowState,
  filter: (_, state) => state === 'started',
  target: startTimer,
});

guard({
  clock: $windowState,
  filter: (state) => state === 'paused',
  target: stopTimer,
});

guard({
  clock: $windowState,
  filter: (state) => state === 'new',
  target: [stopTimer, resetTimer],
});

sample({
  source: $notCompletedTasks,
  clock: guard({
    clock: changeWindowState,
    source: $windowState,
    filter: (state, btn) => state === 'started' && btn === 'secondaryBtn',
  }),
  fn: (tasks) => (tasks.length ? tasks[0].id : ''),
  target: completeTask,
});
