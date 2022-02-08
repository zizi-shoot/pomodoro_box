import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useEvent } from 'effector-react';
import styles from './task-form.module.css';
import { addTask } from '../../models/tasks';

export const TaskForm = () => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const addTaskEvent = useEvent(addTask);

  const validateForm = () => {
    if (value.length <= 3) return 'Введите более 3-х символов';
    return '';
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValueError(validateForm());

    const isFormValid = !validateForm();

    if (!isFormValid) return;
    addTaskEvent(value);
    setValue('');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {
        valueError && <span className={styles.valueError}>{valueError}</span>
      }
      <input
        className={styles.input}
        type="text"
        name="task"
        id="taskInput"
        placeholder="Название задачи"
        value={value}
        onChange={handleChange}
        aria-invalid={valueError ? 'true' : 'false'}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="taskInput">Название задачи</label>
      <button className={styles.submitBtn} type="submit">Добавить</button>
    </form>
  );
};
