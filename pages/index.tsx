import React from 'react';
import { fork, serialize } from 'effector';
import classNames from 'classnames';
import { Legend } from '../components/main/Legend';
import TaskForm from '../components/main/TaskForm';
import { TimerWindow } from '../components/main/TimerWindow';
import styles from '../components/Layout/IndexLayout/index-layout.module.css';
import commonStyles from '../components/Layout/layout.module.css';
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
  const instructionClass = classNames(commonStyles.tile, styles.instruction);
  const tasksClass = classNames(commonStyles.tile, styles.tasks);
  const timerWindowClass = classNames(commonStyles.tile, styles.timerWindow);

  return (
    <Layout>
      <IndexLayout>
        <Legend extraClass={instructionClass} />
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
