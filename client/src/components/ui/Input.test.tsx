import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input, Textarea } from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies dark theme by default', () => {
    render(<Input label="Name" id="name" isDark={true} />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
  });

  it('applies light theme', () => {
    render(<Input label="Name" id="name" isDark={false} />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
  });

  it('accepts input value', () => {
    render(<Input label="Name" id="name" value="John" readOnly />);
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  it('can be required', () => {
    render(<Input label="Email" id="email" required />);
    expect(screen.getByLabelText('Email')).toBeRequired();
  });
});

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" id="message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('accepts textarea value', () => {
    render(<Textarea label="Message" id="message" value="Hello" readOnly />);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('can be required', () => {
    render(<Textarea label="Message" id="message" required />);
    expect(screen.getByLabelText('Message')).toBeRequired();
  });
});
