export type Tester = {
  id: number;
  nextTask: number;
  tasks: TaskRef[]
}

export type TaskRef = {
  fontIndex: number;
  taskType:  'reading' | 'selection';
  contentIndex: number;
}