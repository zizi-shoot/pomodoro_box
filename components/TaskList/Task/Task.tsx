import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useEvent } from 'effector-react';
import { Task as TaskProps } from '../../../typings';
import {
  decreaseTimers,
  editTask,
  increaseTimers, removeTask,
} from '../../../models/tasks';
import styles from './task.module.css';
import { EditDialog } from './EditDialog';
import { Menu } from './Menu';
import { RemoveConfirm } from '../../modals';

export const Task = ({ task }: { task: TaskProps }) => {
  const { id, name, timersCount } = task;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>(name);

  const editTaskFn = useEvent(editTask);
  const increaseTimersFn = useEvent(increaseTimers);
  const decreaseTimersFn = useEvent(decreaseTimers);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDialogValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (dialogValue.length > 0) {
      editTaskFn({ id, value: dialogValue });
      setIsEditDialogOpen(false);
      return;
    }

    setDialogValue(name);
    setIsEditDialogOpen(false);
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
    <li className={styles.task}>
      <div className={styles.counterWrapper}>
        <button className={styles.counterBtn} type="button" onClick={() => decreaseTimersFn(id)}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#F64032" />
            <path d="M12.6124 13.0435H11.3879H8.16016V11.8774H11.3879L12.4802 11.8775L12.6124 11.8774H15.8402V13.0435H12.6124Z" fill="white" />
          </svg>
        </button>
        <span className={styles.counter}>{timersCount} 🍅</span>
        <button className={styles.counterBtn} type="button" onClick={() => increaseTimersFn(id)}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.5" r="12" fill="#35B36E" />
            <path d="M12.6124 13.0436V16.3402H11.3879V13.0436H8.16016V11.8776H11.3879V8.66016H12.6124V11.8776H15.8402V13.0436H12.6124Z" fill="white" />
          </svg>
        </button>
      </div>
      <span className={styles.name}>{name}</span>
      <button onClick={() => setIsMenuOpened(!isMenuOpened)} type="button" className={styles.menuBtn}>
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
            handleEditClick={() => setIsEditDialogOpen(true)}
            handleRemoveClick={toggleModalContainer}
            onClose={() => setIsMenuOpened(false)}
          />
        )
      }
      {
        isEditDialogOpen
        && (
          <EditDialog
            value={dialogValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClose={() => setIsEditDialogOpen(false)}
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
