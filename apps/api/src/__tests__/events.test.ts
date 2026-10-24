import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

describe('POST /api/v1/events', () => {
  const app = createApp();

  it('records a single build event', async () => {
    const eventPayload = {
      mode: 'guided',
      type: 'COMPONENT_DRAGGED',
      timestamp: Date.now(),
      payload: { componentId: 'amd-ryzen-7-7800x3d', targetSlot: 'cpu_socket' }
    };

    const res = await request(app)
      .post('/api/v1/events')
      .send(eventPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('count', 1);
  });

  it('records a batch of build events', async () => {
    const batchPayload = [
      {
        mode: 'free',
        type: 'TOOL_SELECTED',
        timestamp: Date.now(),
        payload: { tool: 'screwdriver' }
      },
      {
        mode: 'free',
        type: 'COMPONENT_PLACED',
        timestamp: Date.now() + 100,
        payload: { componentId: 'motherboard-b650', slotId: 'cabinet_standoffs' }
      }
    ];

    const res = await request(app)
      .post('/api/v1/events')
      .send(batchPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('count', 2);
  });

  it('rejects invalid event payload with 400', async () => {
    const invalidPayload = {
      mode: 'invalid_mode',
      type: 'TEST'
    };

    const res = await request(app)
      .post('/api/v1/events')
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
