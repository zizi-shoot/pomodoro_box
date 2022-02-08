import React, { ChangeEvent, FormEvent } from 'react';
import styles from './edit-dialog.module.css';
import { useCloseModal } from '../../../../hooks/useCloseModal';

interface Props {
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: FormEvent) => void,
  onClose: () => void,
}

export const EditDialog = (props: Props) => {
  const {
    value,
    handleChange,
    handleSubmit,
    onClose,
  } = props;

  const ref = useCloseModal({ onClose });

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={handleChange}
          minLength={3}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
        />
        <button className={styles.submitBtn} type="submit">Ок</button>
      </form>
    </div>
  );
};
