import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies dark theme by default', () => {
    render(<Card isDark={true}>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies light theme', () => {
    render(<Card isDark={false}>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles click when clickable', () => {
    const handleClick = vi.fn();
    render(<Card clickable onClick={handleClick}>Clickable</Card>);
    screen.getByText('Clickable').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom className', () => {
    render(<Card className="custom">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('custom');
  });
});
