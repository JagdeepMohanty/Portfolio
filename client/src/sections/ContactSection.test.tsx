import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from './ContactSection';

describe('ContactSection Integration', () => {
  it('renders contact section with all elements', () => {
    render(<ContactSection theme="dark" />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Have a project, opportunity, or idea/)).toBeInTheDocument();
  });

  it('displays all contact options', () => {
    render(<ContactSection theme="dark" />);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders contact form with all fields', () => {
    render(<ContactSection theme="dark" />);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows user to fill out form', async () => {
    const user = userEvent.setup();
    render(<ContactSection theme="dark" />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message');
  });

  it('has correct contact links', () => {
    render(<ContactSection theme="dark" />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    const emailLink = screen.getByRole('link', { name: /email/i });
    
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jagdeepmohanty');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/JagdeepMohanty');
    expect(emailLink).toHaveAttribute('href', 'mailto:jagdeepmohanty1807@gmail.com');
  });

  it('applies light theme correctly', () => {
    render(<ContactSection theme="light" />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });
});
