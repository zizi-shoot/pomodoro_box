import React from 'react';
import { fork, serialize } from 'effector';
import classNames from 'classnames';
import { Instruction } from '../components/main/Instruction';
import TaskForm from '../components/main/TaskForm';
import { TimerWindow } from '../components/main/TimerWindow';
import styles from '../components/Layout/IndexLayout/index-layout.module.css';
import { TaskList } from '../components/main/TaskList';
import { IndexLayout, Layout } from '../components/Layout';

export async function getStaticProps() {
  const scope = fork();
  const serializedScope = serialize(scope);

  return {
    props: {
      initialState: serializedScope,
    },
  };
}

const Home = () => {
  const instructionClass = classNames(styles.tile, styles.instruction);
  const tasksClass = classNames(styles.tile, styles.tasks);
  const timerWindowClass = classNames(styles.tile, styles.timerWindow);

  return (
    <Layout>
      <IndexLayout>
        <Instruction extraClass={instructionClass} />
        <div className={tasksClass}>
          <TaskForm />
          <TaskList />
        </div>
        <TimerWindow extraClass={timerWindowClass} />
      </IndexLayout>
    </Layout>
  );
};

export default Home;
