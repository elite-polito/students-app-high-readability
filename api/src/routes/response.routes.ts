import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { addResponse, deleteResponse, Response } from '../queries/response.queries.js';
import { getTester, updateNextTask } from '../queries/tester.queries.js';

const router = Router();

const responseValidation = [
  check('testerId').isNumeric(),
  check('contentIndex').isNumeric(),
  check('taskType').isString().isIn(['reading', 'selection']),
  check('isCorrect').isBoolean(),
  check('timeMs').isNumeric(),
  check('fontIndex').isNumeric()
];

type Request = {
  body: Response;
};

// Add a new response
router.post('', responseValidation, async (req: Request, res: any) => {
  const invalidFields = validationResult(req);

  if (!invalidFields.isEmpty()) {
    return res.status(400).json({ errors: invalidFields.array() });
  }

  try {
    const tester = await getTester(req.body.testerId);

    let responseQuestionIndex = null;

    for (const [index, task] of tester.tasks.entries()) {
      if (task.contentIndex === req.body.contentIndex) {
        responseQuestionIndex = index;
        break;
      }
    }

    if(responseQuestionIndex !== tester.nextTask) {
      return res.status(400).json({ error: 'Invalid question' });
    }

    const nextQuestion = tester.nextTask + 1;

    addResponse(req.body).then((newResponseId) => {
      updateNextTask(req.body.testerId, nextQuestion).then(() => {
        res.json({ nextQuestion });
      }).catch(async () => {
        await deleteResponse(newResponseId);
        res.status(500).json({ error: 'Could not update next question' });
      });
    }).catch(() => {
      res.status(500).json({ error: 'Could not add response' });
    });

  } catch (e) {
    return res.status(404).json({ error: 'Tester not found' });
  }

  }
);

export default router;
