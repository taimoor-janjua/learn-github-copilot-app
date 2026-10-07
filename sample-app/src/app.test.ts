import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('Task API', () => {
  it('GET /health returns ok', async () => {
    const res = await request(createApp()).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('creates and then lists a task', async () => {
    const app = createApp();

    const created = await request(app).post('/tasks').send({ title: 'Demo task' });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe('Demo task');
    expect(created.body.completed).toBe(false);

    const list = await request(app).get('/tasks');
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
  });

  it('marks a task completed via PATCH', async () => {
    const app = createApp();
    const created = await request(app).post('/tasks').send({ title: 'Finish slides' });

    const patched = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .send({ completed: true });

    expect(patched.status).toBe(200);
    expect(patched.body.completed).toBe(true);
  });

  it('returns 404 for an unknown task', async () => {
    const res = await request(createApp()).get('/tasks/does-not-exist');
    expect(res.status).toBe(404);
  });

  it('trims surrounding whitespace from the title', async () => {
    const res = await request(createApp()).post('/tasks').send({ title: '  Demo task  ' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Demo task');
  });

  const invalidBodies: Array<[string, unknown]> = [
    ['missing title', {}],
    ['null title', { title: null }],
    ['empty title', { title: '' }],
    ['whitespace-only title', { title: '   ' }],
    ['tab/newline title', { title: '\t\n' }],
    ['numeric title', { title: 42 }],
    ['boolean title', { title: false }],
    ['object title', { title: {} }],
    ['array title', { title: ['x'] }],
    ['array body', [{ title: 'x' }]],
  ];

  it.each(invalidBodies)('rejects %s with 400 and does not create a task', async (_name, body) => {
    const app = createApp();

    const res = await request(app).post('/tasks').send(body as object);
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ error: 'title is required and must be a non-empty string' });

    const list = await request(app).get('/tasks');
    expect(list.body).toHaveLength(0);
  });

  it.each([
    ['malformed JSON', '{"title":'],
    ['top-level null', 'null'],
    ['top-level string', '"abc"'],
  ])('rejects %s body with a JSON 400 and does not create a task', async (_name, raw) => {
    const app = createApp();

    const res = await request(app)
      .post('/tasks')
      .set('Content-Type', 'application/json')
      .send(raw);
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ error: 'Request body must be valid JSON' });

    const list = await request(app).get('/tasks');
    expect(list.body).toHaveLength(0);
  });
});
