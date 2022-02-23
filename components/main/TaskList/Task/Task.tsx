import React, {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { useEvent } from 'effector-react';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task as TaskProps } from '../../../../typings';
import { editTask, removeTask } from '../../../../models/tasks';
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
  const taskClass = classNames(styles.container, isCompleted ? styles.completed : null);

  const refMenu = useRef<HTMLButtonElement>(null);
  const refEdit = useRef<HTMLButtonElement>(null);

  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>(name);
  const [coords, setCoords] = useState({});

  const editTaskFn = useEvent(editTask);
  const removeTaskFn = useEvent(removeTask);

  const updateBtnCoords = (button: HTMLButtonElement): void => {
    const rect = button.getBoundingClientRect();

    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
  };

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = (event): void => {
    if (event.currentTarget instanceof HTMLButtonElement) {
      event.stopPropagation();
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
    removeTaskFn(id);
    toggleModalContainer();
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    zIndex: isDragging ? 1001 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={taskClass}
      style={style}
      ref={setNodeRef}
    >
      <button
        type="button"
        className={styles.orderBtn}
        {...listeners}
        {...attributes}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25 7.5C8.54547 7.5 8.83806 7.4418 9.11104 7.32873C9.38402 7.21566 9.63206 7.04992 9.84099 6.84099C10.0499 6.63206 10.2157 6.38402 10.3287 6.11104C10.4418 5.83806 10.5 5.54547 10.5 5.25C10.5 4.95453 10.4418 4.66194 10.3287 4.38896C10.2157 4.11598 10.0499 3.86794 9.84099 3.65901C9.63206 3.45008 9.38402 3.28434 9.11104 3.17127C8.83806 3.0582 8.54547 3 8.25 3C7.65326 3 7.08097 3.23705 6.65901 3.65901C6.23705 4.08097 6 4.65326 6 5.25C6 5.84674 6.23705 6.41903 6.65901 6.84099C7.08097 7.26295 7.65326 7.5 8.25 7.5V7.5ZM8.25 14.25C8.84674 14.25 9.41903 14.0129 9.84099 13.591C10.2629 13.169 10.5 12.5967 10.5 12C10.5 11.4033 10.2629 10.831 9.84099 10.409C9.41903 9.98705 8.84674 9.75 8.25 9.75C7.65326 9.75 7.08097 9.98705 6.65901 10.409C6.23705 10.831 6 11.4033 6 12C6 12.5967 6.23705 13.169 6.65901 13.591C7.08097 14.0129 7.65326 14.25 8.25 14.25V14.25ZM10.5 18.75C10.5 19.0455 10.4418 19.3381 10.3287 19.611C10.2157 19.884 10.0499 20.1321 9.84099 20.341C9.63206 20.5499 9.38402 20.7157 9.11104 20.8287C8.83806 20.9418 8.54547 21 8.25 21C7.95453 21 7.66194 20.9418 7.38896 20.8287C7.11598 20.7157 6.86794 20.5499 6.65901 20.341C6.45008 20.1321 6.28434 19.884 6.17127 19.611C6.0582 19.3381 6 19.0455 6 18.75C6 18.1533 6.23705 17.581 6.65901 17.159C7.08097 16.7371 7.65326 16.5 8.25 16.5C8.84674 16.5 9.41903 16.7371 9.84099 17.159C10.2629 17.581 10.5 18.1533 10.5 18.75V18.75ZM15.75 7.5C16.0455 7.5 16.3381 7.4418 16.611 7.32873C16.884 7.21566 17.1321 7.04992 17.341 6.84099C17.5499 6.63206 17.7157 6.38402 17.8287 6.11104C17.9418 5.83806 18 5.54547 18 5.25C18 4.95453 17.9418 4.66194 17.8287 4.38896C17.7157 4.11598 17.5499 3.86794 17.341 3.65901C17.1321 3.45008 16.884 3.28434 16.611 3.17127C16.3381 3.0582 16.0455 3 15.75 3C15.1533 3 14.581 3.23705 14.159 3.65901C13.7371 4.08097 13.5 4.65326 13.5 5.25C13.5 5.84674 13.7371 6.41903 14.159 6.84099C14.581 7.26295 15.1533 7.5 15.75 7.5V7.5ZM18 12C18 12.5967 17.7629 13.169 17.341 13.591C16.919 14.0129 16.3467 14.25 15.75 14.25C15.1533 14.25 14.581 14.0129 14.159 13.591C13.7371 13.169 13.5 12.5967 13.5 12C13.5 11.4033 13.7371 10.831 14.159 10.409C14.581 9.98705 15.1533 9.75 15.75 9.75C16.3467 9.75 16.919 9.98705 17.341 10.409C17.7629 10.831 18 11.4033 18 12V12ZM15.75 21C16.0455 21 16.3381 20.9418 16.611 20.8287C16.884 20.7157 17.1321 20.5499 17.341 20.341C17.5499 20.1321 17.7157 19.884 17.8287 19.611C17.9418 19.3381 18 19.0455 18 18.75C18 18.4545 17.9418 18.1619 17.8287 17.889C17.7157 17.616 17.5499 17.3679 17.341 17.159C17.1321 16.9501 16.884 16.7843 16.611 16.6713C16.3381 16.5582 16.0455 16.5 15.75 16.5C15.1533 16.5 14.581 16.7371 14.159 17.159C13.7371 17.581 13.5 18.1533 13.5 18.75C13.5 19.3467 13.7371 19.919 14.159 20.341C14.581 20.7629 15.1533 21 15.75 21V21Z" fill="black" />
        </svg>
      </button>
      <span className={styles.counter}>{timersCount} 🍅</span>
      <span title={name} className={styles.name}>{name}</span>
      <button
        ref={refMenu}
        onClick={handleMenuClick}
        type="button"
        className={styles.menuBtn}
        tabIndex={isCompleted ? -1 : 0}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="22" r="3" />
          <circle cx="22" cy="22" r="3" />
          <circle cx="32" cy="22" r="3" />
        </svg>
      </button>
      {
        isMenuOpened
        && (
          <Menu
            task={task}
            refEdit={refEdit}
            style={coords}
            updateCoords={() => {
              if (refMenu.current instanceof HTMLButtonElement) updateBtnCoords(refMenu.current);
            }}
            handleEditClick={handleEditClick}
            handleRemoveClick={toggleModalContainer}
            onClose={() => setIsMenuOpened(!isMenuOpened)}
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
    </div>
  );
};
