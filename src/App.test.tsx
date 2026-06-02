import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';
import { createDefaultState } from './lib/repository';
import { STEPS } from './lib/steps';
import { useWindStore } from './store/wind-store';

beforeEach(() => {
  localStorage.clear();
  useWindStore.setState({ settings: createDefaultState().settings });
  document.body.classList.remove('dim');
});

describe('Wind Down', () => {
  it('shows the home and is visible (no opacity-freeze)', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /When should the day end/ })).toBeVisible();
  });

  it('runs the ritual and dims the screen from the second step', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Start winding down now' }));
    expect(screen.getByRole('heading', { name: STEPS[0].title })).toBeInTheDocument();
    expect(document.body.classList.contains('dim')).toBe(false); // step 1, not dim yet
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(document.body.classList.contains('dim')).toBe(true); // step 2 → dim
  });

  it('reaches goodnight and returns home, clearing the dim', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Start winding down now' }));
    for (let i = 0; i < STEPS.length - 1; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Goodnight' }));
    expect(screen.getByRole('heading', { name: /When should the day end/ })).toBeInTheDocument();
    expect(document.body.classList.contains('dim')).toBe(false);
  });
});
