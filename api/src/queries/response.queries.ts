import { getDb } from '../helpers/db.helpers.js';

export type Response = {
  testerId: number;
  fontIndex: number;
  contentIndex: number;
  taskType: 'selection' | 'reading';
  isCorrect: boolean;
  timeMs: number;
}

export const addResponse = async (response: Response) => {
  const db = getDb();

  return new Promise<number>(function(resolve, reject) {
    db.run('INSERT INTO responses (testerId, contentIndex, taskType, isCorrect, timeMs, fontIndex) VALUES (?, ?, ?, ?, ?, ?)', [
      response.testerId,
      response.contentIndex,
      response.taskType,
      response.isCorrect,
      response.timeMs,
      response.fontIndex,
    ], function(err) {
      if (err) reject(err);

      resolve(this.lastID);
    });
  });
};

export const deleteResponse = async (responseId: number) => {
  const db = getDb();

  return new Promise<void>(function(resolve, reject) {
    db.run('DELETE FROM responses WHERE id=?', [responseId], function(err) {
      if (err) reject(err);

      resolve();
    });
  });
};