import React from 'react';
import styles from './mark.module.css';

interface Props {
  title: string,
  value: string,
  backgroundColor: string,
  backgroundImage: string,
}

export const Mark = (props: Props) => {
  const {
    title,
    value,
    backgroundColor,
    backgroundImage,
  } = props;

  return (
    <article className={styles.container} style={{ backgroundColor, backgroundImage: `url(${backgroundImage})` }}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </article>
  );
};
