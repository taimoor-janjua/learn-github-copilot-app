import { randomUUID } from 'node:crypto';
import type { Task } from './types.js';

/**
 * In-memory task store. Intentionally small so it is easy to reason about
 * during a live demo. Several methods are deliberately incomplete — see the
 * exercises in /exercises for the gaps the agent is meant to fill.
 */
export class TaskStore {
  private tasks = new Map<string, Task>();

  list(): Task[] {
    return [...this.tasks.values()];
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  create(title: string): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(task.id, task);
    return task;
  }

  setCompleted(id: string, completed: boolean): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    task.completed = completed;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  seed(titles: string[]): void {
    for (const title of titles) this.create(title);
  }

  // Exercise 2: add remove(id) so the API can support DELETE /tasks/:id.
}
