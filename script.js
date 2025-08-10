// Normal Calculator
document.getElementById('calculator').addEventListener('submit', function(e){
  e.preventDefault();
  const expr = document.getElementById('operationInput').value.trim();
  const resultDiv = document.getElementById('normalResultText');
  if(expr){
    try{
      const result = math.evaluate(expr);
      resultDiv.textContent = `Result: ${result}`;
    }catch{
      resultDiv.textContent = 'Invalid Expression!';
    }
  } else {
    resultDiv.textContent = 'Please enter a valid expression.';
  }
});

// Rule of Three (Novo formato)
document.getElementById('ruleOfThreeCalculator').addEventListener('submit', function(e){
  e.preventDefault();
  const A = parseFloat(document.getElementById('inputA').value);
  const B = parseFloat(document.getElementById('inputB').value);
  const C = parseFloat(document.getElementById('inputC').value);
  const resultDiv = document.getElementById('ruleOfThreeResultText');
  const inputX = document.getElementById('inputX');
  if (!isNaN(A) && !isNaN(B) && !isNaN(C) && A !== 0) {
    const X = (B * C) / A;
    inputX.value = X.toFixed(4);
    resultDiv.textContent = `X = ${X.toFixed(4)}`;
  } else {
    resultDiv.textContent = A === 0 ? 'A cannot be zero.' : 'Please fill all fields.';
    inputX.value = '';
  }
});

// Leverage
document.getElementById('leverageCalculator').addEventListener('submit', function(e){
  e.preventDefault();
  const leverage = parseFloat(document.getElementById('leverage').value);
  const percentage = parseFloat(document.getElementById('percentage').value);
  const resultDiv = document.getElementById('leveragedProfitResultText');
  if (!isNaN(leverage) && !isNaN(percentage)) {
    const result = leverage * percentage;
    resultDiv.textContent = `Leverage Profit: ${result.toFixed(2)}`;
  } else {
    resultDiv.textContent = 'Please fill all fields.';
  }
});

// Profit percentage
document.getElementById('profitCalculator').addEventListener('submit', function(e){
  e.preventDefault();
  const lotSize = parseFloat(document.getElementById('lotSize').value);
  const profit = parseFloat(document.getElementById('profit').value);
  const resultDiv = document.getElementById('profitResultText');
  if (!isNaN(lotSize) && !isNaN(profit) && lotSize !== 0) {
    const result = (profit / lotSize) * 100;
    resultDiv.textContent = `Profit Percentage: ${result.toFixed(2)}%`;
  } else {
    resultDiv.textContent = 'Please fill all fields.';
  }
});

// Compound interest
document.getElementById('compoundInterestCalculator').addEventListener('submit', function(e){
  e.preventDefault();
  const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
  const contribution = parseFloat(document.getElementById('contribution').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const period = parseInt(document.getElementById('period').value);
  const resultDiv = document.getElementById('compoundInterestResultText');
  if (!isNaN(initialInvestment) && !isNaN(contribution) && !isNaN(rate) && !isNaN(period)) {
    let finalAmount = initialInvestment * Math.pow(1 + rate, period);
    for(let i = 1; i <= period; i++) {
      finalAmount += contribution * Math.pow(1 + rate, period - i);
    }
    resultDiv.textContent = `Final Amount: $${finalAmount.toFixed(2)}`;
  } else {
    resultDiv.textContent = 'Please fill all fields.';
  }
});

// B3 Profit Calculator
document.getElementById('b3ProfitCalculator').addEventListener('submit', function(e){
  e.preventDefault();
  const contracts = parseInt(document.getElementById('contracts').value, 10);
  const type = document.getElementById('type').value;
  const points = parseFloat(document.getElementById('points').value);
  const taxDeducted = document.getElementById('taxDeducted').checked;
  const resultDiv = document.getElementById('b3ProfitResultText');
  if (isNaN(contracts) || isNaN(points)) {
    resultDiv.textContent = 'Please fill all fields.';
    return;
  }
  let multiplier = 1;
  switch (type) {
    case "miniIndice": multiplier = 0.2; break;
    case "miniDolar":  multiplier = 10; break;
    case "indice":     multiplier = 1; break;
    case "dolar":      multiplier = 50; break;
  }
  let profit = contracts * points * multiplier;
  if (taxDeducted) profit *= 0.8;
  resultDiv.textContent = `Profit: R$ ${profit.toFixed(2)}${taxDeducted ? ' (after 20% tax)' : ''}`;
});
