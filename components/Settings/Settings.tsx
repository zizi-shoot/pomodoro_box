/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  createRef,
  FormEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useEvent, useStore } from 'effector-react';
import { Transition } from 'react-transition-group';
import { useCloseModal, useScrollBlock, useToggleTheme } from '../../hooks';
import styles from './settings.module.css';
import {
  $largeBreakLimit, $smallBreakAmount,
  $smallBreakLimit,
  $workLimit,
  changeLargeBreakLimit,
  changeSmallBreakAmount,
  changeSmallBreakLimit,
  changeWorkLimit,
  resetSettings,
} from '../../models/timers';
import { $appTheme, changeTheme } from '../../models/app';
import { AppTheme } from '../../types';
import { TransitionState } from '../../types/TransitionState';

interface Props {
  handleCloseFn: () => void,
}

export const Settings = ({ handleCloseFn }: Props) => {
  const modal = document.body;

  const [isMounted, setIsMounted] = useState(false);
  const appTheme = useStore($appTheme);
  const changeThemeFn = useEvent(changeTheme);

  const workLimit = useStore($workLimit);
  const smallBreakLimit = useStore($smallBreakLimit);
  const largeBreakLimit = useStore($largeBreakLimit);
  const smallBreakAmount = useStore($smallBreakAmount);

  const changeWorkLimitFn = useEvent(changeWorkLimit);
  const changeSmallBreakLimitFn = useEvent(changeSmallBreakLimit);
  const changeLargeBreakLimitFn = useEvent(changeLargeBreakLimit);
  const changeSmallBreakAmountFn = useEvent(changeSmallBreakAmount);
  const resetSettingsFn = useEvent(resetSettings);

  const [activeTheme, setActiveTheme] = useState<AppTheme>(appTheme);
  const [workLimitValue, setWorkLimitValue] = useState(workLimit);
  const [smallBreakLimitValue, setSmallBreakLimitValue] = useState(smallBreakLimit);
  const [largeBreakLimitValue, setLargeBreakLimitValue] = useState(largeBreakLimit);
  const [smallBreakAmountValue, setSmallBreakAmountValue] = useState(smallBreakAmount);

  const [blockScroll, allowScroll] = useScrollBlock();
  const toggleTheme = useToggleTheme();
  const ref = useCloseModal({ handleClose: () => setIsMounted(false) });
  const transitionRef: RefObject<HTMLDivElement> = createRef();

  const duration = 500;
  const defaultStyleBack = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };
  const transitionStylesBack: TransitionState = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  const defaultStyleSettings = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateX(100%)',
  };
  const transitionStylesSettings: TransitionState = {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
  };

  const setSystemTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    changeThemeFn('themeSystem');
    localStorage.removeItem('appTheme');

    const html = document.querySelector('html');
    if (!html) return;

    html.classList.remove('themeDefault');
    html.classList.remove(isDarkMode ? 'themeLight' : 'themeDark');
    html.classList.add(isDarkMode ? 'themeDark' : 'themeLight');
  };

  const handleThemeBtnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { value, active } = event.currentTarget.dataset;
    const html = document.querySelector('html');

    if (value) {
      setActiveTheme(value as AppTheme);

      if (value === 'themeSystem') {
        setSystemTheme();
        return;
      }

      if (active !== 'true' && html && !html.classList.contains(value)) {
        toggleTheme();
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    changeWorkLimitFn(workLimitValue);
    changeSmallBreakLimitFn(smallBreakLimitValue);
    changeLargeBreakLimitFn(largeBreakLimitValue);
    changeSmallBreakAmountFn(smallBreakAmountValue);
    setIsMounted(false);
  };

  const handleReset = () => {
    resetSettingsFn();
    setWorkLimitValue(1500);
    setSmallBreakLimitValue(300);
    setLargeBreakLimitValue(1800);
    setSmallBreakAmountValue(4);
  };

  useEffect(() => {
    setIsMounted(true);
    blockScroll();

    return () => {
      setIsMounted(false);
      allowScroll();
    };
  }, []);

  if (!modal) return null;

  return createPortal(
    (
      <Transition in={isMounted} timeout={duration} onExited={handleCloseFn} nodeRef={transitionRef}>
        {
          (state: keyof TransitionState) => (
            <div className={styles.backDrop} style={{ ...defaultStyleBack, ...transitionStylesBack[state] }} ref={transitionRef}>
              <section
                className={styles.container}
                ref={ref}
                style={{ ...defaultStyleSettings, ...transitionStylesSettings[state] }}
              >
                <header className={styles.header}>
                  <h2 className={styles.title}>Настройки</h2>
                  <button className={styles.closeBtn} type="button" onClick={() => setIsMounted(false)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8333 5.34169L14.6583 4.16669L9.99996 8.82502L5.34163 4.16669L4.16663 5.34169L8.82496 10L4.16663 14.6584L5.34163 15.8334L9.99996 11.175L14.6583 15.8334L15.8333 14.6584L11.175 10L15.8333 5.34169Z" fill="black" />
                    </svg>
                  </button>
                </header>
                <main className={styles.main}>
                  <div>
                    <h3 className={styles.itemTitle}>Тема</h3>
                    <button onClick={handleThemeBtnClick} className={styles.themeBtn} type="button" data-value="themeLight" data-active={activeTheme === 'themeLight'}>Светлая</button>
                    <button onClick={handleThemeBtnClick} className={styles.themeBtn} type="button" data-value="themeSystem" data-active={activeTheme === 'themeSystem'}>Системная</button>
                    <button onClick={handleThemeBtnClick} className={styles.themeBtn} type="button" data-value="themeDark" data-active={activeTheme === 'themeDark'}>Тёмная</button>
                  </div>
                  <form className={styles.miscForm} onSubmit={handleSubmit}>
                    <fieldset className={styles.inputGroup}>
                      <legend className={styles.itemTitle}>Продолжительность</legend>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="workLimit">Один помидор</label>
                        <input
                          type="number"
                          name="workLimit"
                          id="workLimit"
                          min="0"
                          max="99"
                          value={workLimitValue / 60}
                          onChange={(event) => setWorkLimitValue(+event.target.value * 60)}
                        />
                        <span>мин</span>
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="smallBreakLimit">Короткий перерыв</label>
                        <input
                          type="number"
                          name="smallBreakLimit"
                          id="smallBreakLimit"
                          min="0"
                          max="99"
                          value={smallBreakLimitValue / 60}
                          onChange={(event) => setSmallBreakLimitValue(+event.target.value * 60)}
                        />
                        <span>мин</span>
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="largeBreakLimit">Длинный перерыв</label>
                        <input
                          type="number"
                          name="largeBreakLimit"
                          id="largeBreakLimit"
                          min="0"
                          max="99"
                          value={largeBreakLimitValue / 60}
                          onChange={(event) => setLargeBreakLimitValue(+event.target.value * 60)}
                        />
                        <span>мин</span>
                      </div>
                    </fieldset>
                    <fieldset className={styles.inputGroup}>
                      <legend className={styles.itemTitle}>Дополнительно</legend>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="smallBreakAmount">Длинный перерыв после</label>
                        <input
                          type="number"
                          name="smallBreakAmount"
                          id="smallBreakAmount"
                          min="2"
                          max="10"
                          value={smallBreakAmountValue}
                          onChange={(event) => setSmallBreakAmountValue(+event.target.value)}
                        />
                        помидоров
                      </div>
                    </fieldset>
                    <button className={styles.saveBtn} type="submit">Сохранить</button>
                    <button className={styles.resetBtn} type="button" onClick={handleReset}>По умолчанию</button>
                  </form>
                </main>
              </section>
            </div>
          )
        }
      </Transition>
    ),
    modal,
  );
};
