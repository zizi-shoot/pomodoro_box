import React, { createRef, RefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from 'effector-react';
import { Transition } from 'react-transition-group';
import styles from './modal.module.css';
import { $notCompletedTodayTasks } from '../../../models/tasks';
import { useIsMounted, useScrollBlock } from '../../../hooks';
import { TransitionState } from '../../../types/TransitionState';

interface Props {
  onClick: () => void,
}

const emptyTaskListText = 'Поздравляю! Вы справились со всеми задачами, так держать 🤘';
const notEmptyTaskListText = 'Можете приступить к следующей задаче или сделать что-нибудь полезное не из списка.';

export const TaskDone = ({ onClick }: Props) => {
  const notCompletedTasks = useStore($notCompletedTodayTasks);
  const isMounted = useIsMounted();
  const modal = document.body;
  const ref: RefObject<HTMLDivElement> = createRef();
  const [blockScroll, allowScroll] = useScrollBlock();
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
          (state) => (
            <div ref={ref} style={{ ...defaultStyle, ...transitionStyles[state] }} className={styles.backDrop}>
              <div className={styles.container}>
                <p className={styles.descr}>Отлично! Задача выполнена ✅</p>
                <p className={styles.descr}>{notCompletedTasks.length ? notEmptyTaskListText : emptyTaskListText}</p>
                <button className={styles.submitBtn} type="button" onClick={onClick}>OK</button>
              </div>
            </div>
          )
        }
      </Transition>
    ), modal,
  );
};
