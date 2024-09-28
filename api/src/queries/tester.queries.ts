import { getDb } from '../helpers/db.helpers.js';

type DbTester = {
  id: number;
  nextTask: number;
  tasks: string
}

export type TaskRef = {
  fontIndex: number;
  taskType:  'reading' | 'selection';
  contentIndex: number;
}

type Tester = Omit<DbTester, 'tasks'> & {
  tasks: TaskRef[]
}

export const getTester = async (id: number) => {
  const db = getDb();

  return new Promise<Tester>(function(resolve, reject) {
    db.get<DbTester>(`SELECT * FROM testers WHERE id=?`, [id], function(err, row) {
      if (err) reject(err);
      if (!row) return reject('Tester not found');

      resolve({
        ...row,
        tasks: row.tasks ? JSON.parse(row.tasks) : []
      });
    });
  });
}

export const updateNextTask = async (id: number, nextTask: number|null) => {
  const db = getDb();

  return new Promise<void>(function(resolve, reject) {
    db.run('UPDATE testers SET nextTask=? WHERE id=?', [nextTask, id], function(err) {
      if (err) reject(err);

      resolve();
    });
  });
}

export const addTester = async (tester: Omit<Tester, 'id'>) => {
  const db = getDb();

  return new Promise<number>(function(resolve, reject) {
    db.run('INSERT INTO testers (nextTask, tasks) VALUES (?, ?)', [
      tester.nextTask,
      JSON.stringify(tester.tasks),
    ], function(err) {
      if (err) reject(err);

      resolve(this.lastID);
    });
  });
}