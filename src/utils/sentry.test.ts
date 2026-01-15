/* eslint-disable sonarjs/no-duplicate-string */
import {
  beforeSend,
  beforeSendTransaction,
  cleanSensitiveData
} from './sentry';

const sensitive = 'sensitive';
const safe = 'safe';

const originalData = {
  a: safe,
  register_number: sensitive,
  arrayOfObjects: [{ a: safe }, { b: safe }],
  arrayOfStrings: [safe],
  object: { c: safe, register_number: sensitive }
};

const cleanedData = {
  a: safe,
  arrayOfObjects: [{ a: safe }, { b: safe }],
  arrayOfStrings: [safe],
  object: { c: safe }
};

describe('beforeSend', () => {
  it('should clear sensitive data', () => {
    expect(
      beforeSend({ extra: { data: originalData }, type: undefined })
    ).toEqual({ extra: { data: cleanedData } });
  });
});

describe('beforeSendTransaction', () => {
  it('should clear sensitive data', () => {
    expect(
      beforeSendTransaction({
        extra: { data: originalData },
        type: 'transaction'
      })
    ).toEqual({ extra: { data: cleanedData }, type: 'transaction' });
  });
});

describe('cleanSensitiveData', () => {
  it('should clear sensitive data', () => {
    expect(cleanSensitiveData(originalData)).toEqual(cleanedData);
  });

  it('should handle circular references without stack overflow', () => {
    // Create an object with circular reference
    const circularObj: Record<string, unknown> = { a: safe };
    circularObj.self = circularObj;

    // This should not throw a stack overflow error
    const result = cleanSensitiveData(circularObj) as Record<string, unknown>;
    
    // The result should have the same structure with circular reference preserved
    expect(result.a).toBe(safe);
    expect(result.self).toBe(result);
  });

  it('should handle nested circular references', () => {
    // Create a more complex circular reference scenario
    const obj1: Record<string, unknown> = { name: 'obj1' };
    const obj2: Record<string, unknown> = { name: 'obj2', ref: obj1 };
    obj1.ref = obj2;

    const result = cleanSensitiveData(obj1) as Record<string, unknown>;
    
    expect(result.name).toBe('obj1');
    expect((result.ref as Record<string, unknown>).name).toBe('obj2');
    expect((result.ref as Record<string, unknown>).ref).toBe(result);
  });

  it('should handle circular references in arrays', () => {
    const arr: unknown[] = [safe];
    arr.push(arr);

    const result = cleanSensitiveData(arr) as unknown[];
    
    expect(result[0]).toBe(safe);
    expect(result[1]).toBe(result);
  });

  it('should handle objects with circular references and sensitive data', () => {
    const circularObj: Record<string, unknown> = {
      a: safe,
      register_number: sensitive
    };
    circularObj.self = circularObj;

    const result = cleanSensitiveData(circularObj) as Record<string, unknown>;
    
    expect(result.a).toBe(safe);
    expect(result.register_number).toBeUndefined(); // sensitive data removed
    expect(result.self).toBe(result);
  });

  it('should handle deeply nested objects within max depth', () => {
    // Create a deeply nested object (depth 31, which is within MAX_CLEAN_DEPTH of 32)
    let deepObj: Record<string, unknown> = { value: 'bottom' };
    for (let i = 0; i < 30; i++) {
      deepObj = { nested: deepObj };
    }

    const result = cleanSensitiveData(deepObj) as Record<string, unknown>;
    
    // Navigate to the bottom to verify it was processed
    let current: unknown = result;
    for (let i = 0; i < 30; i++) {
      expect(current).toBeDefined();
      current = (current as Record<string, unknown>).nested;
    }
    expect((current as Record<string, unknown>).value).toBe('bottom');
  });

  it('should return [MaxDepthExceeded] for objects exceeding max depth', () => {
    // Create a deeply nested object (depth 33, which exceeds MAX_CLEAN_DEPTH of 32)
    let deepObj: Record<string, unknown> = { value: 'bottom' };
    for (let i = 0; i < 32; i++) {
      deepObj = { nested: deepObj };
    }

    const result = cleanSensitiveData(deepObj) as Record<string, unknown>;
    
    // Navigate to depth 32 and check that it returns the placeholder
    let current: unknown = result;
    for (let i = 0; i < 32; i++) {
      expect(current).toBeDefined();
      current = (current as Record<string, unknown>).nested;
    }
    expect(current).toBe('[MaxDepthExceeded]');
  });

  it('should handle custom max depth parameter', () => {
    // Create a nested object with depth 5
    let deepObj: Record<string, unknown> = { value: 'bottom' };
    for (let i = 0; i < 4; i++) {
      deepObj = { nested: deepObj };
    }

    // Set custom max depth to 3
    const result = cleanSensitiveData(deepObj, new WeakMap(), 0, 3) as Record<string, unknown>;
    
    // Navigate to depth 3 and verify it returns placeholder
    let current: unknown = result;
    for (let i = 0; i < 3; i++) {
      expect(current).toBeDefined();
      current = (current as Record<string, unknown>).nested;
    }
    expect(current).toBe('[MaxDepthExceeded]');
  });

  it('should handle primitives', () => {
    expect(cleanSensitiveData('string')).toBe('string');
    expect(cleanSensitiveData(123)).toBe(123);
    expect(cleanSensitiveData(true)).toBe(true);
    expect(cleanSensitiveData(null)).toBe(null);
    expect(cleanSensitiveData(undefined)).toBe(undefined);
  });
});
