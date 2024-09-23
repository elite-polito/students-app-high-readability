import { Router } from 'express';
import { getTester } from '../queries/tester.queries.js';

const router = Router();

// Get a tester by its id
router.get('/:id(\\d+)', async (req, res) => {

  try {
    console.log(req.params.id);
    const tester = await getTester(Number(req.params.id));
    res.json(tester);
  } catch (e) {
    res.status(404).json({ error: 'Tester not found' });
  }

});


export default router;
