import React from 'react';
import classNames from 'classnames';
import { Layout, StatsLayout } from '../components/Layout';
import { Activity } from '../components/stats/Activity';
import { TopBar } from '../components/stats/TopBar';
import { PomodoroCounter } from '../components/stats/PomodoroCounter';
import { Chart } from '../components/stats/Chart';
import { MarkContainer } from '../components/stats/MarkContainer';
import styles from '../components/Layout/StatsLayout/stats-layout.module.css';

const Stats = () => {
  const activityClass = classNames(styles.tile, styles.activity);
  const pomodoroCounterClass = classNames(styles.tile, styles.pomodoroCounter);
  const chartClass = classNames(styles.tile, styles.chart);

  return (
    <Layout>
      <StatsLayout>
        <TopBar extraClass={styles.topBar} />
        <Activity extraClass={activityClass} />
        <PomodoroCounter extraClass={pomodoroCounterClass} />
        <Chart extraClass={chartClass} />
        <MarkContainer extraClass={styles.markContainer} />
      </StatsLayout>
    </Layout>
  );
};

export default Stats;
