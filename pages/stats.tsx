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
        <MarkContainer extraClass={styles.markContainer}>
          <Mark
            title="Фокус"
            value={10}
            backgroundColor="var(--green-light)"
            backgroundImage="/img/focus.svg"
          />
          <Mark
            title="Время на паузе"
            value={10}
            backgroundColor="var(--orange-light)"
            backgroundImage="/img/pause.svg"
          />
          <Mark
            title="Остановки"
            value={10}
            backgroundColor="var(--red-light)"
            backgroundImage="/img/stop.svg"
          />
        </MarkContainer>
      </StatsLayout>
    </Layout>
  );
};

export default Stats;
