function clearResult(form) {
  form.querySelectorAll('.result').forEach(r => (r.innerText = ''));
}

function showError(form, msg, resultEl) {
  clearResult(form);
  const el = resultEl || form.querySelector('.result');
  if (el) el.innerText = 'Error: ' + msg;
}

function toNumber(value) {
  if (value === undefined || value === null) return null;
  const num = parseFloat(String(value).replace(',', '.'));
  return Number.isNaN(num) ? null : num;
}

function calculateExpression(form) {
  const resultEl = form.querySelector('.result');
  const expr = form.querySelector('#operationInput')?.value?.trim() ?? '';
  if (!expr) return showError(form, 'Input required', resultEl);
  try {
    const result = math.evaluate(expr.replace(',', '.'));
    resultEl.innerText = `Result: ${result}`;
  } catch {
    showError(form, 'Invalid expression', resultEl);
  }
}

function calculateRuleOfThree(form) {
  const resultEl = form.querySelector('.result');
  const inputX = form.querySelector('#inputX');
  const A = toNumber(form.querySelector('#inputA').value);
  const B = toNumber(form.querySelector('#inputB').value);
  const C = toNumber(form.querySelector('#inputC').value);
  if (A === null || B === null || C === null) {
    if (inputX) inputX.value = '';
    return showError(form, 'Fill all fields.', resultEl);
  }
  if (A === 0) {
    if (inputX) inputX.value = '';
    return showError(form, 'A cannot be zero.', resultEl);
  }
  const X = (B * C) / A;
  if (!isFinite(X)) {
    if (inputX) inputX.value = '';
    return showError(form, 'Invalid calculation.', resultEl);
  }
  if (inputX) inputX.value = X.toFixed(2).replace('.', ',');
  resultEl.innerText = `X = ${X.toFixed(2).replace('.', ',')}`;
}

function calculateLeverage(form) {
  const resultEl = form.querySelector('.result');
  const leverage = toNumber(form.querySelector('#leverage').value);
  const percentage = toNumber(form.querySelector('#percentage').value);
  if (leverage === null || percentage === null)
    return showError(form, 'All fields required', resultEl);
  const leveragedProfit = leverage * percentage;
  resultEl.innerText = `Leveraged Profit: ${leveragedProfit.toFixed(2)}%`;
}

function calculateProfitPercentage(form) {
  const resultEl = form.querySelector('.result');
  const lotSize = toNumber(form.querySelector('#lotSize').value);
  const profit = toNumber(form.querySelector('#profit').value);
  if (lotSize === null || profit === null)
    return showError(form, 'All fields required', resultEl);
  if (lotSize === 0)
    return showError(form, 'Lot size cannot be zero.', resultEl);
  const profitPercent = (profit / lotSize) * 100;
  resultEl.innerText = `Profit: ${profitPercent.toFixed(2)}%`;
}

function compoundInterestCalc(initialInvestment, contribution, annualRate, years, freq) {
  const freqMap = { daily: 365, weekly: 52, monthly: 12, yearly: 1 };
  const periodsPerYear = freqMap[freq];
  if (!periodsPerYear) return NaN;
  const ratePerPeriod = annualRate / 100 / periodsPerYear;
  const totalPeriods = years * periodsPerYear;
  let total = initialInvestment;
  for (let i = 0; i < totalPeriods; i++) {
    total = (total + contribution) * (1 + ratePerPeriod);
  }
  return total;
}

function calculateCompoundInterest(form) {
  const resultEl = form.querySelector('.result');
  const initialInvestment = toNumber(form.querySelector('#initialInvestment').value);
  const contribution = toNumber(form.querySelector('#contribution').value) || 0;
  const rate = toNumber(form.querySelector('#rate').value);
  const years = toNumber(form.querySelector('#period').value);
  const freq = form.querySelector('#compoundFrequency')?.value ?? 'monthly';
  if (initialInvestment === null || rate === null || years === null)
    return showError(form, 'Main fields required', resultEl);
  const total = compoundInterestCalc(initialInvestment, contribution, rate, years, freq);
  if (!isFinite(total)) return showError(form, 'Invalid calculation.', resultEl);
  resultEl.innerText = `Total Value: ${total.toFixed(2)}`;
}

function b3ProfitCalc(contracts, points, type, taxDeducted) {
  const contractValues = { miniIndice: 0.2, indice: 1, miniDolar: 10, dolar: 50 };
  let total = contracts * contractValues[type] * points;
  if (taxDeducted) total *= 0.8;
  return total;
}

function calculateB3Profit(form) {
  const resultEl = form.querySelector('.result');
  const contracts = toNumber(form.querySelector('#contracts').value);
  const points = toNumber(form.querySelector('#points').value);
  const type = form.querySelector('#type').value;
  const taxDeducted = form.querySelector('#taxDeducted').checked;
  if (contracts === null || points === null)
    return showError(form, 'All fields required', resultEl);
  if ((type === 'dolar' || type === 'indice') && contracts % 5 !== 0)
    return showError(form, 'Contracts must be multiples of 5 for Dollar and Index.', resultEl);
  const total = b3ProfitCalc(contracts, points, type, taxDeducted);
  resultEl.innerText = `Total Profit: ${total.toFixed(2)}`;
}

const handlers = {
  calculator: calculateExpression,
  ruleOfThreeCalculator: calculateRuleOfThree,
  leverageCalculator: calculateLeverage,
  profitCalculator: calculateProfitPercentage,
  compoundInterestCalculator: calculateCompoundInterest,
  b3ProfitCalculator: calculateB3Profit,
};

if (typeof document !== 'undefined') {
  function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.classList.add('ripple-effect');
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);
  }

  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  document.querySelectorAll('.calculator input, .calculator select').forEach(input => {
    input.addEventListener('input', e => {
      clearResult(e.target.closest('form'));
      if (e.target.closest('form').id === 'ruleOfThreeCalculator') {
        e.target.closest('form').querySelector('#inputX').value = '';
      }
    });
  });

  document.querySelectorAll('.calculator input').forEach(input => {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.closest('form').dispatchEvent(new Event('submit'));
      }
    });
  });

  document.querySelectorAll('form.calculator').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      clearResult(form);
      const handler = handlers[form.id];
      if (handler) handler(form);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.classList.add('loaded');
    }, 60);
  });
}

if (typeof module !== 'undefined') {
  module.exports = { toNumber, compoundInterestCalc, b3ProfitCalc };
}

