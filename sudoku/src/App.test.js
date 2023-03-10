import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Sudoku App', () => {
  test('renders Sudoku board', () => {
    render(<App />);
    const boardElement = screen.getByTestId('board');
    expect(boardElement).toBeInTheDocument();
  });

  test('changes number on clicking on a cell', () => {
    render(<App />);
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).toHaveTextContent('');
    userEvent.type(cell, '1');
    expect(cell).toHaveValue('1');
  });
});