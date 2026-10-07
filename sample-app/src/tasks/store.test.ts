import { describe, it, expect, vi } from 'vitest';
import { TaskStore } from './store.js';

describe('TaskStore', () => {
  it('creates a task with sensible defaults', () => {
    const store = new TaskStore();
    const task = store.create('Write the talk');

    expect(task.title).toBe('Write the talk');
    expect(task.completed).toBe(false);
    expect(task.id).toBeTruthy();
    expect(task.createdAt).toBe(task.updatedAt);
  });

  it('lists every created task', () => {
    const store = new TaskStore();
    store.create('a');
    store.create('b');

    expect(store.list()).toHaveLength(2);
  });

  it('marks a task as completed', () => {
    const store = new TaskStore();
    const task = store.create('a');

    const updated = store.setCompleted(task.id, true);

    expect(updated?.completed).toBe(true);
  });

  it('refreshes updatedAt when completing a task', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
      const store = new TaskStore();
      const task = store.create('a');
      const createdAt = task.createdAt;

      vi.setSystemTime(new Date('2024-01-01T00:00:05.000Z'));
      const updated = store.setCompleted(task.id, true)!;

      expect(updated.updatedAt).toBe('2024-01-01T00:00:05.000Z');
      expect(updated.updatedAt).not.toBe(createdAt);
      expect(updated.updatedAt >= updated.createdAt).toBe(true);
      expect(updated.createdAt).toBe(createdAt);
    } finally {
      vi.useRealTimers();
    }
  });

  it('returns undefined when completing a task that does not exist', () => {
    const store = new TaskStore();
    expect(store.setCompleted('missing', true)).toBeUndefined();
  });
});
