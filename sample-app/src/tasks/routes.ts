import { Router } from 'express';
import type { TaskStore } from './store.js';

export function createTaskRouter(store: TaskStore): Router {
  const router = Router();

  // Exercise 4: support filtering with GET /tasks?completed=true|false
  router.get('/', (_req, res) => {
    res.json(store.list());
  });

  router.post('/', (req, res) => {
    const { title } = req.body ?? {};
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'title is required and must be a non-empty string',
      });
    }
    const task = store.create(title.trim());
    res.status(201).json(task);
  });

  router.get('/:id', (req, res) => {
    const task = store.get(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  router.patch('/:id', (req, res) => {
    const { completed } = req.body ?? {};
    const task = store.setCompleted(req.params.id, Boolean(completed));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  return router;
}
