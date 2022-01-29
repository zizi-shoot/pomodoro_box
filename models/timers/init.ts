import { $timersByTask, addFirstTimer, addTimer, removeTimer } from './index';

$timersByTask
  .on(addFirstTimer, (state, taskId) => ({
    ...state,
    [taskId]: [{
      status: 'new',
      timePassed: 0,
    }],
  }))
  .on(addTimer, (state, taskId) => ({
    ...state,
    [taskId]: [
      ...state[taskId],
      {
        status: 'new',
        timePassed: 0,
      },
    ],
  }))
  .on(removeTimer, (state, taskId) => ({
    ...state,
    [taskId]: [
      ...state[taskId].filter((_, i, arr) => i !== arr.length - 1),
    ],
  }));
