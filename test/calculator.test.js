const test = require('node:test');
const assert = require('node:assert');
const { compoundInterestCalc, b3ProfitCalc } = require('../script.js');

test('compound interest yearly without contributions', () => {
  const total = compoundInterestCalc(1000, 0, 12, 2, 'yearly');
  assert.strictEqual(Number(total.toFixed(2)), 1254.4);
});

test('b3 profit with tax deducted', () => {
  const total = b3ProfitCalc(5, 10, 'miniDolar', true);
  assert.strictEqual(total, 400);
});
