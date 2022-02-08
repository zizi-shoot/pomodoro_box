import React from 'react';
import { fork, serialize } from 'effector';
import classNames from 'classnames';
import { Instruction } from '../components/Instruction';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { TimerWindow } from '../components/TimerWindow';
import styles from '../components/Layout/layout.module.css';
import { TaskList } from '../components/TaskList';

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
  const instructionClasses = classNames(styles.tile, styles.instruction);
  const tasksClasses = classNames(styles.tile, styles.tasks);
  const timerWindowClasses = classNames(styles.tile, styles.timerWindow);

  return (
    <Layout>
      <Instruction extraClass={instructionClasses} />
      <div className={tasksClasses}>
        <TaskForm />
        <TaskList />
      </div>
      <TimerWindow extraClass={timerWindowClasses} />
    </Layout>
  );
};

export default Home;
