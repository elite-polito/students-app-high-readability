import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { addResponse, deleteResponse, Response } from '../queries/response.queries.js';
import { getTester, updateNextQuestion } from '../queries/tester.queries.js';

const router = Router();

const responseValidation = [
  check('tester_id').isNumeric(),
  check('question_id').isNumeric(), // TODO add validation for max id
  check('question_type').isString().isIn(['read', 'read_check_1', 'read_check_2', 'read_check_3', 'pick']),
  check('is_correct').isBoolean(),
  check('time_ms').isNumeric(),
  check('font_id').isNumeric()
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
    const tester = await getTester(req.body.tester_id);

    if(req.body.question_id !== tester.next_question) {
      return res.status(400).json({ error: 'Invalid question' });
    }

    let nextQuestion: number|null = null;
    let pickNext = false;
    for (const question of tester.questions) {
      if (pickNext) {
        nextQuestion = question.id;
        break;
      }

      if (question.id === tester.next_question) {
        pickNext = true;
      }
    }

    addResponse(req.body).then((newResponseId) => {
      updateNextQuestion(req.body.tester_id, nextQuestion).then(() => {
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
