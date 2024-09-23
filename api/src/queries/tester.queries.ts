import { getDb } from '../helpers/db.helpers.js';

type DbTester = {
  id: number;
  next_question: number;
  questions: string
}

type Tester = Omit<DbTester, 'questions'> & {
  questions: number[]
}

export const getTester = async (id: number) => {
  const db = getDb();

  return new Promise<Tester>(function(resolve, reject) {
    db.get<DbTester>(`SELECT * FROM testers WHERE id=?`, [id], function(err, row) {
      if (err) reject(err);
      if (!row) return reject('Tester not found');

      resolve({
        ...row,
        questions: row.questions ? JSON.parse(row.questions) : []
      });
    });
  });
}

export const updateNextQuestion = async (id: number, nextQuestion: number|null) => {
  const db = getDb();

  return new Promise<void>(function(resolve, reject) {
    db.run('UPDATE testers SET next_question=? WHERE id=?', [nextQuestion, id], function(err) {
      if (err) reject(err);

      resolve();
    });
  });
}