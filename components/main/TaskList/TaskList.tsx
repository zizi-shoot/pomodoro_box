import React, { useRef, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { $tasks, $todayTasks, sortTasks } from '../../../models/tasks';
import { Task } from './Task';
import { $workLimit } from '../../../models/timers';
import styles from './task-list.module.css';

export const TaskList = () => {
  const tasks = useStore($tasks);
  const todayTasks = useStore($todayTasks);
  const workTime = useStore($workLimit);
  const sortTasksFn = useEvent(sortTasks);
  const totalTimersCounter = todayTasks.reduce((acc, task) => acc + task.timersCount, 0);
  const estimatedTime = new Date(totalTimersCounter * workTime * 1000);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      sortTasksFn(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  const [isShowTask, setIsShowTask] = useState(false);
  const transitionRef = useRef(null);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      {
        todayTasks.length > 0
          ? (
            <ul className={styles.container}>
              <SortableContext items={todayTasks} strategy={verticalListSortingStrategy}>
                <TransitionGroup component={null}>
                  {todayTasks.map((task) => (
                    <CSSTransition
                      nodeRef={transitionRef}
                      in={isShowTask}
                      key={task.id}
                      timeout={{
                        enter: 300,
                        exit: 0,
                      }}
                      unmountOnExit
                      classNames={{
                        enter: styles.taskEnter,
                        enterActive: styles.taskEnterActive,
                      }}
                      onEnter={() => setIsShowTask(true)}
                      onExited={() => setIsShowTask(false)}
                    >
                      <Task key={task.id} task={task} ref={transitionRef} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </SortableContext>
            </ul>
          )
          : <p className={styles.emptyWarning}>Список задач пуст</p>
      }
      {
        todayTasks.length > 0
        && (
          <p className={styles.estimatedTime}>
            {estimatedTime.getUTCHours()} ч {estimatedTime.getMinutes()} мин
          </p>
        )
      }
    </DndContext>
  );
};
