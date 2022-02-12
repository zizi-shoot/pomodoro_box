import React, { ReactNode } from 'react';
import styles from './mark-container.module.css';

interface Props {
  children?: ReactNode,
  extraClass?: string,
}

export const MarkContainer = ({ children, extraClass }: Props) => (
  <section className={extraClass} title="карточки с показателями">
    {children}
  </section>
);
