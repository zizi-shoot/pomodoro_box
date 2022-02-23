/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollBlock } from '../../hooks';
import styles from './settings.module.css';

interface Props {
  handleClose: () => void,
}

export const Settings = ({ handleClose }: Props) => {
  const modal = document.getElementById('settings');

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
      <section className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Настройки</h2>
          <button className={styles.closeBtn} type="button" onClick={handleClose}>X</button>
        </header>
        <main className={styles.main}>
          <ul className={styles.list}>
            <li>
              <h3 className={styles.itemTitle}>Тема</h3>
              <form className={styles.themeForm}>
                <input className={styles.radioBtn} type="radio" name="theme" id="themeLight" value="themeLight" />
                <label className={styles.radioLabel} htmlFor="themeLight">Светлая</label>
                <input className={styles.radioBtn} type="radio" name="theme" id="themeSystem" value="themeSystem" />
                <label className={styles.radioLabel} htmlFor="themeSystem">Системная</label>
                <input className={styles.radioBtn} type="radio" name="theme" id="themeDark" value="themeDark" />
                <label className={styles.radioLabel} htmlFor="themeDark">Тёмная</label>
              </form>
            </li>
            <li>
              <h3 className={styles.itemTitle}>Продолжительность</h3>
              <ul className={styles.sublist}>
                <li>
                  <label>Помидор</label>
                  <input type="number" name="workLimit" id="workLimit" />
                </li>
                <li>
                  <label>Короткий перерыв</label>
                  <input type="number" name="smallBreakLimit" id="smallBreakLimit" />
                </li>
                <li>
                  <label>Длинный перерыв</label>
                  <input type="number" name="largeBreakLimit" id="largeBreakLimit" />
                </li>
              </ul>
            </li>
            <li>
              <h3 className={styles.itemTitle}>Дополнительно</h3>
              <ul>
                <li>Длинный перерыв после __ помидоров</li>
              </ul>
            </li>
          </ul>
        </main>
      </section>
    ), modal,
  );
};
