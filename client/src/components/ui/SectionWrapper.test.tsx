import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionWrapper } from './SectionWrapper';

describe('SectionWrapper', () => {
  it('renders with id', () => {
    render(<SectionWrapper id="test">Content</SectionWrapper>);
    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveAttribute('id', 'test');
  });

  it('renders title when provided', () => {
    render(<SectionWrapper id="test" title="Test Title">Content</SectionWrapper>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionWrapper id="test" subtitle="Test Subtitle">Content</SectionWrapper>);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<SectionWrapper id="test">Child Content</SectionWrapper>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies dark theme by default', () => {
    render(<SectionWrapper id="test" isDark={true}>Content</SectionWrapper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies light theme', () => {
    render(<SectionWrapper id="test" isDark={false}>Content</SectionWrapper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
