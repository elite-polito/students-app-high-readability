import { getDb } from '../helpers/db.helpers.js';

export type Response = {
  tester_id: number;
  question_id: number;
  question_type: 'read' | 'read_check_1' | 'read_check_2' | 'read_check_3' | 'pick';
  is_correct: boolean;
  time_ms: number;
  font_id: number;
}

export const addResponse = async (response: Response) => {
  const db = getDb();

  return new Promise<number>(function(resolve, reject) {
    db.run('INSERT INTO responses (tester_id, question_id, question_type, is_correct, time_ms, font_id) VALUES (?, ?, ?, ?, ?, ?)', [
      response.tester_id,
      response.question_id,
      response.question_type,
      response.is_correct,
      response.time_ms,
      response.font_id
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
}