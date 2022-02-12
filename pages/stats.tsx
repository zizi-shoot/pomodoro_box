import React from 'react';
import classNames from 'classnames';
import { Layout, StatsLayout } from '../components/Layout';
import { Activity } from '../components/stats/Activity';
import { TopBar } from '../components/stats/TopBar';
import { PomodoroCounter } from '../components/stats/PomodoroCounter';
import { Chart } from '../components/stats/Chart';
import { MarkContainer } from '../components/stats/MarkContainer';
import { Mark } from '../components/stats/Mark';
import styles from '../components/Layout/StatsLayout/stats-layout.module.css';

const Stats = () => {
  const topBarClass = classNames(styles.topBar);
  const activityClass = classNames(styles.tile, styles.activity);
  const pomodoroCounterClass = classNames(styles.tile, styles.pomodoroCounter);
  const chartClass = classNames(styles.tile, styles.chart);
  const markContainerClass = classNames(styles.tile, styles.markContainer);

  return (
    <Layout>
      <StatsLayout>
        <TopBar extraClass={topBarClass} />
        <Activity extraClass={activityClass} />
        <PomodoroCounter extraClass={pomodoroCounterClass} />
        <Chart extraClass={chartClass} />
        <MarkContainer extraClass={markContainerClass}>
          <Mark />
          <Mark />
          <Mark />
        </MarkContainer>
      </StatsLayout>
    </Layout>
  );
};

export default Stats;
