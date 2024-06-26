import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<string>('0');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClick = (value: string) => {
    if (value === '=') {
      try {
        const roundedResult = Math.round((eval(result) + Number.EPSILON) * 100) / 100;
        if (isNaN(roundedResult) || roundedResult === Infinity) {
          setResult('Error');
          setErrorMessage('Error: Cannot divide by zero');
        } else {
          setResult(roundedResult.toString());
          setErrorMessage('');
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('Infinity')) {
          setErrorMessage('Error: Cannot divide by zero');
          setResult('Error');
        } else {
          setResult('Error');
          setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    } else if (value === 'C') {
      setResult('0');
      setErrorMessage('');
    } else {
      setResult(result === '0' ? value : result + value);
      setErrorMessage('');
    }
  };

  const handleRounding = (value: string) => {
    const currentResult = parseFloat(result);
    const roundedResult = Math.round(currentResult);
    setResult(roundedResult.toString());
  };

  return (
    <div data-testid="calculator">
      <input type="text" data-testid="display" value={result} readOnly />
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
      <div>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('C')}>C</button>
      </div>
      <div>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>×</button>
        <button onClick={() => handleRounding('round')}>Round</button>
      </div>
      <div>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('(')}>(</button>
      </div>
      <div>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('=')}>=</button>
        <button onClick={() => handleClick(')')}>)</button>
      </div>
    </div>
  );
};

export default Calculator;
