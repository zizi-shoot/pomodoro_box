import React, { createRef, RefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import styles from './modal.module.css';
import { useIsMounted, useScrollBlock } from '../../../hooks';
import { TransitionState } from '../../../types/TransitionState';

interface Props {
  handleSubmit: () => void,
  handleAbort: () => void,
}

export const RemoveConfirm = ({ handleSubmit, handleAbort }: Props) => {
  const modal = document.body;
  const [blockScroll, allowScroll] = useScrollBlock();
  const ref: RefObject<HTMLDivElement> = createRef();
  const isMounted = useIsMounted();
  const duration = 200;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: TransitionState = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  useEffect(() => {
    blockScroll();

    return () => {
      allowScroll();
    };
  }, []);

  if (!modal) return null;

  return createPortal(
    (
      <Transition in={isMounted} timeout={duration} nodeRef={ref}>
        {
          (state: keyof TransitionState) => (
            <div ref={ref} style={{ ...defaultStyle, ...transitionStyles[state] }} className={styles.backDrop}>
              <div className={styles.container}>
                <p className={styles.descr}>Удалить задачу?</p>
                <button className={styles.submitBtn} onClick={handleSubmit} type="submit">Да</button>
                <button className={styles.abortBtn} onClick={handleAbort} type="submit">Отмена</button>
              </div>
            </div>
          )
        }
      </Transition>

    ), modal,
  );
};
