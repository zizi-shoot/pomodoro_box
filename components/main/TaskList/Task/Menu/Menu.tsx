import React, {
  CSSProperties,
  MouseEventHandler,
  RefObject,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { useEvent, useStore } from 'effector-react';
import styles from './menu.module.css';
import { useCloseModal } from '../../../../../hooks';
import { $notCompletedTodayTasks, decreaseTimers, increaseTimers } from '../../../../../models/tasks';
import { $timerState } from '../../../../../models/timers';
import { Task } from '../../../../../types';

interface Props {
  task: Task,
  refEdit: RefObject<HTMLButtonElement>,
  handleEditClick: MouseEventHandler,
  style: CSSProperties,
  handleRemoveClick: () => void,
  handleClose: () => void,
  updateCoords: () => void,
}

export const Menu = (props: Props) => {
  const {
    task,
    refEdit,
    handleEditClick,
    style,
    handleRemoveClick,
    handleClose,
    updateCoords,
  } = props;
  const notCompletedTasks = useStore($notCompletedTodayTasks);
  const timerState = useStore($timerState);

  const increaseTimersFn = useEvent(increaseTimers);
  const decreaseTimersFn = useEvent(decreaseTimers);

  const currentTask = notCompletedTasks ? notCompletedTasks[0] : null;

  const ref = useCloseModal({ handleClose });
  const modal = document.getElementById('context-menu');

  useEffect(() => {
    window.addEventListener('resize', updateCoords);

    return () => {
      window.removeEventListener('resize', updateCoords);
    };
  }, []);

  if (!modal) return null;

  return createPortal(
    (
      <div style={{ ...style }} className={styles.container} ref={ref}>
        <button
          className={styles.btn}
          type="button"
          onClick={() => increaseTimersFn(task.id)}
          tabIndex={task.isCompleted ? -1 : 0}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#35B36E" />
            <path d="M12.6124 13.0436V16.3402H11.3879V13.0436H8.16016V11.8776H11.3879V8.66016H12.6124V11.8776H15.8402V13.0436H12.6124Z" fill="white" />
          </svg>
          Добавить 1 помидор
        </button>
        <button
          className={styles.btn}
          type="button"
          onClick={() => decreaseTimersFn(task.id)}
          disabled={task.timersCount === 1}
          tabIndex={task.isCompleted ? -1 : 0}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#F64032" />
            <path d="M12.6124 13.0435H11.3879H8.16016V11.8774H11.3879L12.4802 11.8775L12.6124 11.8774H15.8402V13.0435H12.6124Z" fill="white" />
          </svg>
          Убрать 1 помидор
        </button>
        <button className={styles.btn} type="button" onClick={handleEditClick} ref={refEdit}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z" fill="#FFAE35" />
          </svg>
          Редактировать
        </button>
        <button
          className={styles.btn}
          type="button"
          onClick={handleRemoveClick}
          disabled={task.id === currentTask?.id && timerState !== 'new'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z" fill="#F64032" />
          </svg>
          Удалить
        </button>
      </div>
    ), modal,
  );
};
