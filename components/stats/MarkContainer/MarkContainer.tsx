import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './mark-container.module.css';

interface Props {
  children?: ReactNode,
  extraClass?: string,
}

export const MarkContainer = ({ children, extraClass }: Props) => {
  const containerClass = classNames(extraClass, styles.container);

  return (
    <section className={containerClass} title="карточки с показателями">
      {children}
    </section>
  );
};
