import React from 'react';
import { fork, serialize } from 'effector';
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

const Home = () => (
  <Layout>
    <Instruction extraClass={styles.instruction} />
    <TaskForm extraClass={styles.taskForm} />
    <TaskList />
    <TimerWindow extraClass={styles.taskWindow} />
  </Layout>
);

export default Home;
