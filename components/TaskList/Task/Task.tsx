import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { useEvent } from 'effector-react';
import classNames from 'classnames';
import { Task as TaskProps } from '../../../typings';
import {
  decreaseTimers,
  editTask,
  increaseTimers,
  removeTask,
} from '../../../models/tasks';
import styles from './task.module.css';
import { EditDialog } from './EditDialog';
import { Menu } from './Menu';
import { RemoveConfirm } from '../../modals';

export const Task = ({ task }: { task: TaskProps }) => {
  const {
    id,
    name,
    timersCount,
    isCompleted,
  } = task;
  const taskClass = classNames(styles.task, isCompleted ? styles.taskCompleted : null);

  const refMenu = useRef<HTMLButtonElement>(null);
  const refEdit = useRef<HTMLButtonElement>(null);

  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>(name);
  const [coords, setCoords] = useState({});

  const editTaskFn = useEvent(editTask);
  const increaseTimersFn = useEvent(increaseTimers);
  const decreaseTimersFn = useEvent(decreaseTimers);

  const updateBtnCoords = (button: HTMLButtonElement): void => {
    const rect = button.getBoundingClientRect();

    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
  };

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = (event): void => {
    if (event.currentTarget instanceof HTMLButtonElement) {
      updateBtnCoords(event.currentTarget);
      setIsMenuOpened(!isMenuOpened);
    }
  };

  const handleEditClick: MouseEventHandler<HTMLButtonElement> = (event): void => {
    if (event.currentTarget instanceof HTMLButtonElement) {
      setIsMenuOpened(!isMenuOpened);
      updateBtnCoords(event.currentTarget);
      setIsEditDialogOpened(!isEditDialogOpened);
    }
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDialogValue(event.target.value);
  };

  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (dialogValue.length > 0) {
      editTaskFn({ id, value: dialogValue });
      setIsEditDialogOpened(false);
      return;
    }

    setDialogValue(name);
    setIsEditDialogOpened(false);
  };

  const toggleModalContainer = () => {
    const modal = document.getElementById('remove-confirm');
    if (!modal) return;

    modal.classList.toggle('hidden');
    setIsModalOpened(!isModalOpened);
  };

  const handleSubmitRemoving = () => {
    removeTask(id);
    toggleModalContainer();
  };

  return (
    <li className={taskClass}>
      <div className={styles.counterWrapper}>
        <button
          className={styles.counterBtn}
          type="button"
          onClick={() => decreaseTimersFn(id)}
          disabled={timersCount === 1}
          tabIndex={isCompleted ? -1 : 0}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#F64032" />
            <path d="M12.6124 13.0435H11.3879H8.16016V11.8774H11.3879L12.4802 11.8775L12.6124 11.8774H15.8402V13.0435H12.6124Z" fill="white" />
          </svg>
        </button>
        <span className={styles.counter}>{timersCount} 🍅</span>
        <button
          className={styles.counterBtn}
          type="button"
          onClick={() => increaseTimersFn(id)}
          tabIndex={isCompleted ? -1 : 0}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#35B36E" />
            <path d="M12.6124 13.0436V16.3402H11.3879V13.0436H8.16016V11.8776H11.3879V8.66016H12.6124V11.8776H15.8402V13.0436H12.6124Z" fill="white" />
          </svg>
        </button>
      </div>
      <span title={name} className={styles.name}>{name}</span>
      <button
        ref={refMenu}
        onClick={handleMenuClick}
        type="button"
        className={styles.menuBtn}
        tabIndex={isCompleted ? -1 : 0}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="22" r="3" fill="#9A9A9A" />
          <circle cx="22" cy="22" r="3" fill="#9A9A9A" />
          <circle cx="32" cy="22" r="3" fill="#9A9A9A" />
        </svg>
      </button>
      {
        isMenuOpened
        && (
          <Menu
            refEdit={refEdit}
            style={coords}
            updateCoords={() => {
              if (refMenu.current instanceof HTMLButtonElement) updateBtnCoords(refMenu.current);
            }}
            handleEditClick={handleEditClick}
            handleRemoveClick={toggleModalContainer}
            onClose={() => setIsMenuOpened(false)}
          />
        )
      }
      {
        isEditDialogOpened
        && (
          <EditDialog
            value={dialogValue}
            style={coords}
            updateCoords={() => {
              if (refMenu.current instanceof HTMLButtonElement) updateBtnCoords(refMenu.current);
            }}
            handleChange={handleEditChange}
            handleSubmit={handleEditSubmit}
          />
        )
      }
      {
        isModalOpened
        && (
          <RemoveConfirm
            handleSubmit={handleSubmitRemoving}
            handleAbort={toggleModalContainer}
          />
        )
      }
    </li>
  );
};
