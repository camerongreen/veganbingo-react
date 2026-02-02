import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  const renderTitle = () => {
    return render(
      <Title>Vegan Bingo</Title>
    );
  };

  it('should render without crashing', () => {
    renderTitle();
    expect(screen.getByText(/Vegan Bingo/i)).toBeInTheDocument();
  });

  it('should display children text', () => {
    renderTitle();
    expect(screen.getByText(/Vegan Bingo/i)).toBeInTheDocument();
  });

  it('should render as a Typography component with h2', () => {
    const { container } = renderTitle();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('.MuiTypography-root')).toBeInTheDocument();
  });

  it('should have correct variant and color', () => {
    const { container } = renderTitle();
    const heading = container.querySelector('h2');
    expect(heading).toHaveClass('MuiTypography-h6');
  });
});
