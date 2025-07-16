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
      beforeSend({ extra: { data: originalData }, type: undefined }, {})
    ).toEqual({ extra: { data: cleanedData } });
  });
});

describe('beforeSendTransaction', () => {
  it('should clear sensitive data', () => {
    expect(
      beforeSendTransaction(
        {
          extra: { data: originalData },
          type: 'transaction'
        },
        {}
      )
    ).toEqual({ extra: { data: cleanedData }, type: 'transaction' });
  });
});

describe('cleanSensitiveData', () => {
  it('should clear sensitive data', () => {
    expect(cleanSensitiveData(originalData)).toEqual(cleanedData);
  });
});
