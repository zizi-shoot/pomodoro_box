export interface Task {
  name: string,
  isCompleted: boolean,
  id: string,
  timersCount: number,
  date: string,
}

export interface EditTask {
  id: string,
  value: string,
}
