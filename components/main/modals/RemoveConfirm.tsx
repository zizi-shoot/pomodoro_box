import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { useScrollBlock } from '../../../hooks';

interface Props {
  handleSubmit: () => void,
  handleAbort: () => void,
}

export const RemoveConfirm = ({ handleSubmit, handleAbort }: Props) => {
  const modal = document.getElementById('remove-confirm');
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();

    return () => {
      allowScroll();
    };
  }, []);

  if (!modal) return null;

  return createPortal(
    (
      <div className={styles.container}>
        <p className={styles.descr}>Удалить задачу?</p>
        <button className={styles.submitBtn} onClick={handleSubmit} type="submit">Да</button>
        <button className={styles.abortBtn} onClick={handleAbort} type="submit">Отмена</button>
      </div>
    ), modal,
  );
};
