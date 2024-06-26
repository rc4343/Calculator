import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  test('renders calculator', () => {
    render(<Calculator />);
    const calculatorElement = screen.getByTestId('calculator');
    expect(calculatorElement).toBeInTheDocument();
  });

  test('performs basic arithmetic operations', () => {
    render(<Calculator />);
    const displayInput = screen.getByTestId('display');
    const button1 = screen.getByText('1');
    const buttonMultiply = screen.getByText('×');
    const button2 = screen.getByText('2');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button1);
    fireEvent.click(buttonMultiply);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(displayInput.value).toBe('2');
  });

  test('catches divide by zero error', async () => {
    render(<Calculator />);
    const button1 = screen.getByText('1');
    const buttonDivide = screen.getByText('/');
    const button0 = screen.getByText('0');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button1);
    fireEvent.click(buttonDivide);
    fireEvent.click(button0);
    fireEvent.click(buttonEquals);

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Error: Cannot divide by zero');
  });

  test('rounds decimal values greater than 0.5 to the next number', () => {
    render(<Calculator />);
    const displayInput = screen.getByTestId('display');
    const button1 = screen.getByText('1');
    const buttonDivide = screen.getByText('/');
    const button2 = screen.getByText('2');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button1);
    fireEvent.click(buttonDivide);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(displayInput.value).toBe('0.5');

    const buttonRound = screen.getByText('Round');
    fireEvent.click(buttonRound);

    expect(displayInput.value).toBe('1');
  });

  test('error message not to be appeared initially', () => {
    render(<Calculator />);
    const errorMessage = screen.queryByTestId('error-message');
    expect(errorMessage).toBeNull();
  });

  test('error appears if divided by zero', async () => {
    render(<Calculator />);
    const displayInput = screen.getByTestId('display');
    const button5 = screen.getByText('5');
    const buttonDivide = screen.getByText('/');
    const button0 = screen.getByText('0');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button5);
    fireEvent.click(buttonDivide);
    fireEvent.click(button0);
    fireEvent.click(buttonEquals);

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Error: Cannot divide by zero');
    expect(displayInput.value).toBe('Error');
  });

  test('shows error message when result is infinity', () => {
    render(<Calculator />);
    const displayInput = screen.getByTestId('display');
    const button1 = screen.getByText('1');
    const buttonDivide = screen.getByText('/');
    const button0 = screen.getByText('0');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button1);
    fireEvent.click(buttonDivide);
    fireEvent.click(button0);
    fireEvent.click(buttonEquals);

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Error: Cannot divide by zero');
    expect(displayInput.value).toBe('Error');
  });

  test('clear button should clear display', () => {
    render(<Calculator />);
    const buttonClear = screen.getByText('C');
    const displayInput = screen.getByTestId('display');
    const button1 = screen.getByText('5');
    const buttonPlus = screen.getByText('+');
    const button2 = screen.getByText('2');
    const buttonEquals = screen.getByText('=');

    fireEvent.click(button1);
    fireEvent.click(buttonPlus);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);
    fireEvent.click(buttonClear);
    expect(displayInput.value).toBe('0');
  });
});
