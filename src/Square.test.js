import React from 'react';
import { render, screen } from '@testing-library/react';
import Square from './Square';

// Mock Link component
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

const mockData = {
  name: 'bacon',
  heading: 'But bacon though...',
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
    expect(screen.getByText('But bacon though...')).toBeInTheDocument();
  });

  it('should display the heading text', () => {
    renderSquare();
    expect(screen.getByText('But bacon though...')).toBeInTheDocument();
  });

  it('should apply the correct background color', () => {
    const { container } = renderSquare();
    const card = container.querySelector('.Square');
    expect(card).toHaveStyle({ backgroundColor: 'pink' });
  });

  it('should use regular image when hasBingo is false', () => {
    renderSquare(false);
    const image = screen.getByAltText('But bacon though... Square');
    expect(image).toHaveAttribute('src', 'images/bacon.png');
  });

  it('should use _done image when hasBingo is true', () => {
    renderSquare(true);
    const image = screen.getByAltText('But bacon though... Square');
    expect(image).toHaveAttribute('src', 'images/bacon_done.png');
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

  it('should handle different colors correctly', () => {
    const dataWithDifferentColor = { ...mockData, colour: 'blue' };
    const { container } = render(
      <Square data={dataWithDifferentColor} hasBingo={false} />
    );
    const card = container.querySelector('.Square');
    expect(card).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('should render all required card components', () => {
    const { container } = renderSquare();
    expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardActionArea-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardMedia-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardContent-root')).toBeInTheDocument();
  });
});
