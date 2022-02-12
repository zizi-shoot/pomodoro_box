import React, {
  ChangeEvent, CSSProperties, FormEvent, useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './edit-dialog.module.css';

interface Props {
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: FormEvent) => void,
  updateCoords: () => void,
  style: CSSProperties,
}

export const EditDialog = (props: Props) => {
  const {
    value,
    handleChange,
    handleSubmit,
    updateCoords,
    style,
  } = props;
  const modal = document.getElementById('edit-dialog');

  useEffect(() => {
    window.addEventListener('resize', updateCoords);

    return () => {
      window.removeEventListener('resize', updateCoords);
    };
  }, []);

  if (!modal) return null;

  return createPortal(
    (
      <div className={styles.container} style={{ ...style }}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
    ), modal,
  );
};
