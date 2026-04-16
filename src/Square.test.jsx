import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Square from './Square';

// Mock Link component
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

const mockData = {
  name: 'bacon',
  heading: 'But bacon though...',
  short_heading: 'Bacon?',
  colour: 'pink',
  alternatives: ['Test alternative'],
  short_answer: 'Test short answer',
  long_answer: 'Test long answer'
};

describe('Square', () => {
  const renderSquare = (hasBingo = false) => {
    return render(
      <Square data={mockData} hasBingo={hasBingo} />
    );
  };

  it('should render without crashing', () => {
    renderSquare();
    expect(screen.getByText('Bacon?')).toBeInTheDocument();
  });

  it('should display the heading text', () => {
    renderSquare();
    expect(screen.getByText('But bacon though...')).toBeInTheDocument();
  });


  it('should use regular image when hasBingo is false', () => {
    renderSquare(false);
    const image = screen.getByAltText('But bacon though... Square');
    expect(image).toHaveAttribute('src', '/images/bacon.png');
  });

  it('should use _done image when hasBingo is true', () => {
    renderSquare(true);
    const image = screen.getByAltText('But bacon though... Square');
    expect(image).toHaveAttribute('src', '/images/bacon_done.png');
  });

  it('should link to the correct detail page', () => {
    renderSquare();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'page/bacon');
  });

  it('should render CardActionArea as a link', () => {
    renderSquare();
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should render image with correct alt text', () => {
    renderSquare();
    const image = screen.getByAltText('But bacon though... Square');
    expect(image).toBeInTheDocument();
  });


  it('should render all required card components', () => {
    const { container } = renderSquare();
    expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardActionArea-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardMedia-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardContent-root')).toBeInTheDocument();
  });
});
