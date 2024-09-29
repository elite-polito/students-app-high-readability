import { Router } from 'express';
import { generateBalancedLatinSquare, getRandomInt, shuffleArray } from '../helpers/math.helpers.js';
import { getDb } from '../helpers/db.helpers.js';
import { addTester, TaskRef } from '../queries/tester.queries.js';

const router = Router();


router.post('/tables', (req, res) => {
  const db = getDb();

  db.run('CREATE TABLE IF NOT EXISTS testers (id INTEGER PRIMARY KEY, nextTask INTEGER, tasks TEXT)', function(err) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  db.run('CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, testerId INTEGER, contentIndex INTEGER, taskType TEXT, isCorrect INTEGER, timeMs INTEGER, fontIndex INTEGER)', function(err) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  res.end();
});

router.post('/testers', (req, res) => {
  const testersCount = req.body.testersCount ?? 80;

  const questionsCount = 20;
  const storiesCount = 10;

  const latinSquare = generateBalancedLatinSquare(6);

// For each participant
  for (let participant = 0; participant < testersCount; participant++) {
    let assignedTasks: TaskRef[] = [];
    const assignedContentIndices = { reading: new Set(), selection: new Set() }; // Track assigned content indices

    // Get the balanced font order for this participant
    const fontOrder = latinSquare[participant % 6].slice(0, 4);

    // Assign tasks for each font
    fontOrder.forEach((fontIndex) => {
      const taskTypes = ['reading', 'selection', 'selection'];
      const randomizedTaskTypes = shuffleArray(taskTypes); // Randomize task order for this font

      // Assign 1 reading and 2 search tasks for this font
      for (let i = 0; i < randomizedTaskTypes.length; i++) {
        const taskType = randomizedTaskTypes[i];

        let contentIndex;
        if (taskType === 'reading') {
          do {
            contentIndex = getRandomInt(0, storiesCount - 1);
          } while (assignedContentIndices.reading.has(contentIndex));
          assignedContentIndices.reading.add(contentIndex);
        } else {
          do {
            contentIndex = getRandomInt(0, questionsCount - 1);
          } while (assignedContentIndices.selection.has(contentIndex));
          assignedContentIndices.selection.add(contentIndex);
        }

        assignedTasks.push({
          fontIndex,
          taskType,
          contentIndex,
        });
      }
    });

    addTester({
      nextTask: 0,
      tasks: assignedTasks,
    });
    res.end();
  }
});

export default router;
