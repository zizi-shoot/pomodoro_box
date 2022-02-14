export type SelectedValues = 'current' | 'last' | 'before-last';
export type SelectedLabels = 'Эта неделя' | 'Прошедшая неделя' | '2 недели назад';

export interface SelectedPeriod {
  value: SelectedValues,
  label: SelectedLabels,
}
