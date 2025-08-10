const { toNumber } = require('../script.js');

describe('toNumber', () => {
  test('empty string returns null', () => {
    expect(toNumber('')).toBeNull();
  });

  test('strings with commas convert correctly', () => {
    expect(toNumber('1,5')).toBe(1.5);
  });

  test('non-numeric strings return null', () => {
    expect(toNumber('abc')).toBeNull();
  });
});
