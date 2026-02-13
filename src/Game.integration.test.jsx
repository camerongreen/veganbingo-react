import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Game from './Game';
import DataService from './services/DataService';
import { BingoProvider } from './services/BingoContext';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

describe('Game integration', () => {
  it('loads and renders squares on start', async () => {
    const dataService = new DataService();
    const sections = dataService.getSections();

    render(
      <BingoProvider sections={sections}>
        <Game />
      </BingoProvider>
    );

    const squares = await screen.findAllByRole('link');
    expect(squares.length).toBe(sections.length);
  });
});
