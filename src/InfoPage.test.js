import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoPage from './InfoPage';
import HelpIcon from '@mui/icons-material/Help';

// Mock Link component
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

describe('InfoPage', () => {
  const renderInfoPage = (props = {}) => {
    const defaultProps = {
      icon: <HelpIcon />,
      heading: 'Test Heading',
      children: <p>Test content</p>
    };
    
    return render(
      <InfoPage {...defaultProps} {...props} />
    );
  };

  it('should render without crashing', () => {
    renderInfoPage();
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('should display the provided heading', () => {
    renderInfoPage({ heading: 'Custom Heading' });
    expect(screen.getByText('Custom Heading')).toBeInTheDocument();
  });

  it('should render children content', () => {
    renderInfoPage({ children: <p>Custom content</p> });
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('should render the provided icon', () => {
    const { container } = renderInfoPage();
    expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
  });

  it('should have a back to grid button', () => {
    renderInfoPage();
    const gridButton = screen.getByRole('link');
    expect(gridButton).toHaveAttribute('href', '/');
  });

  it('should render within a Paper component', () => {
    const { container } = renderInfoPage();
    expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
  });

  it('should render within a Container', () => {
    const { container } = renderInfoPage();
    expect(container.querySelector('.MuiContainer-root')).toBeInTheDocument();
  });

  it('should have a divider', () => {
    const { container } = renderInfoPage();
    expect(container.querySelector('.MuiDivider-root')).toBeInTheDocument();
  });
});
