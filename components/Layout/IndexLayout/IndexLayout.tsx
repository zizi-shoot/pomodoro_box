import React from 'react';
import styles from './index-layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export const IndexLayout = ({ children }: Props) => (
  <>
    <main className={styles.main}>
      <h1 className="visually-hidden">Менеджер задач по методу помидора</h1>
      <div className={styles.container}>{children}</div>
    </main>
    <div id="task-done" className="modal hidden" />
    <div id="remove-confirm" className="modal hidden" />
    <div id="edit-dialog" />
    <div id="menu" />
  </>
);
