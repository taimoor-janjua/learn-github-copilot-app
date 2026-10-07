import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { TaskStore } from './tasks/store.js';
import { createTaskRouter } from './tasks/routes.js';
import { renderTasksPage } from './tasks/view.js';

/**
 * Build the Express application. A store can be injected to make testing easy.
 */
export function createApp(store: TaskStore = new TaskStore()): Express {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/', (_req, res) => {
    res.type('html').send(renderTasksPage(store.list()));
  });

  app.use('/tasks', createTaskRouter(store));

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if ((err as { type?: string })?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Request body must be valid JSON' });
    }
    next(err);
  });

  return app;
}
