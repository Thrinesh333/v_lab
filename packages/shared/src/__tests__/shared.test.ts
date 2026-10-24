import { describe, expect, it } from 'vitest';
import {
  API_PREFIX,
  BuildEventSchema,
  ComponentCategorySchema,
  checkBuild,
  simulateBoot,
  type BuildState,
  type Component
} from '../index.js';

describe('Shared Contract & Stubs', () => {
  it('should expose correct API_PREFIX', () => {
    expect(API_PREFIX).toBe('/api/v1');
  });

  it('should validate ComponentCategory enum', () => {
    const validCategory = 'cpu';
    expect(ComponentCategorySchema.safeParse(validCategory).success).toBe(true);

    const invalidCategory = 'mouse';
    expect(ComponentCategorySchema.safeParse(invalidCategory).success).toBe(false);
  });

  it('should validate BuildEvent schema', () => {
    const validEvent = {
      mode: 'guided' as const,
      type: 'COMPONENT_PLACED',
      timestamp: Date.now(),
      payload: { slotId: 'cpu_socket', componentId: 'intel-i7-13700k' }
    };
    const parsed = BuildEventSchema.safeParse(validEvent);
    expect(parsed.success).toBe(true);
  });

  it('should execute stub checkBuild and simulateBoot', () => {
    const mockBuild: BuildState = {
      placed: {},
      connections: [],
      flags: { thermalPasteApplied: false },
      stepLog: []
    };
    const mockCatalog: Component[] = [];

    const validationResults = checkBuild(mockBuild, mockCatalog);
    expect(Array.isArray(validationResults)).toBe(true);
    expect(validationResults.length).toBe(0);

    const bootResult = simulateBoot(mockBuild, mockCatalog);
    expect(bootResult.status).toBe('success');
    expect(bootResult.postLines.length).toBeGreaterThan(0);
    expect(bootResult.faults).toEqual([]);
  });
});
