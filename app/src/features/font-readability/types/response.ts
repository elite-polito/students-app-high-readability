export type Response = {
  testerId: number;
  contentIndex: number;
  taskType: 'reading' | 'selection';
  fontIndex: number;
  isCorrect: boolean;
  timeMs: number;
}