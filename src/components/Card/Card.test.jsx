import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card component', () => {
  const defaultProps = {
    title: 'Waste Collection',
    description: 'Find your bin collection day',
    linkTo: '/services/1',
    linkText: 'View details',
  };

  it('renders title and description', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /waste collection/i })).toBeInTheDocument();
    expect(screen.getByText(/find your bin collection day/i)).toBeInTheDocument();
  });

  it('renders a link with correct href', () => {
    render(<Card {...defaultProps} />);
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/services/1');
  });

  it('uses custom heading level when provided', () => {
    render(<Card {...defaultProps} headingLevel="h2" />);
    const heading = screen.getByRole('heading', { name: /waste collection/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
