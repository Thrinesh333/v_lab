import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App.js';

describe('App Root and Navigation', () => {
  it('renders landing page with headline and demo accounts notice', () => {
    render(<App />);
    expect(screen.getAllByText(/PC Assembly/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Learn & Practice/i)).toBeInTheDocument();
    expect(screen.getByText(/Seeded Demo Credentials/i)).toBeInTheDocument();
  });

  it('renders navbar brand title and sign in links', () => {
    render(<App />);
    expect(screen.getAllByText(/Virtual Lab/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sign In/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);
  });
});
