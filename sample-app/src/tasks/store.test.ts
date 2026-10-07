import { describe, it, expect } from 'vitest';
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

  it('returns undefined when completing a task that does not exist', () => {
    const store = new TaskStore();
    expect(store.setCompleted('missing', true)).toBeUndefined();
  });

  it('removes an existing task', () => {
    const store = new TaskStore();
    const task = store.create('a');
    store.create('b');

    expect(store.remove(task.id)).toBe(true);
    expect(store.get(task.id)).toBeUndefined();
    expect(store.list()).toHaveLength(1);
  });

  it('returns false when removing a task that does not exist', () => {
    const store = new TaskStore();
    store.create('a');

    expect(store.remove('missing')).toBe(false);
    expect(store.list()).toHaveLength(1);
  });
});
