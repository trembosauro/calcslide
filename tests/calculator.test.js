const { compoundInterestCalc, b3ProfitCalc } = require('../script.js');

test('compound interest yearly without contributions', () => {
  const total = compoundInterestCalc(1000, 0, 12, 2, 'yearly');
  expect(Number(total.toFixed(2))).toBe(1254.4);
});

test('b3 profit with tax deducted', () => {
  const total = b3ProfitCalc(5, 10, 'miniDolar', true);
  expect(total).toBe(400);
});
