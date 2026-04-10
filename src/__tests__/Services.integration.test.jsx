import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Services from '../pages/Services/Services';
import * as api from '../services/api';

expect.extend(toHaveNoViolations);

vi.mock('../services/api');

const mockServices = [
  { id: 1, name: 'Waste Collection', description: 'Bin collection' },
  { id: 2, name: 'Library Services', description: 'Books and reading' },
  { id: 3, name: 'Council Tax', description: 'Pay your tax' },
];

describe('Services page integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.fetchAllServices.mockResolvedValue(mockServices);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all services on load', async () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Waste Collection')).toBeInTheDocument();
    });
  });

  it('filters services when user types in search', async () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    // Wait for initial load with real timers so waitFor can poll
    await waitFor(() => {
      expect(screen.getByText('Waste Collection')).toBeInTheDocument();
    });

    // Switch to fake timers only for the debounce portion.
    // Use fireEvent instead of userEvent.type — userEvent's Promise-based
    // delays deadlock under vi.useFakeTimers() in userEvent v14 + Vitest 4.
    vi.useFakeTimers();

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'library' } });

    // Flush the 300ms debounce in SearchInput
    vi.advanceTimersByTime(300);

    // Restore real timers so waitFor can poll again
    vi.useRealTimers();

    await waitFor(() => {
      expect(screen.getByText('Library Services')).toBeInTheDocument();
      expect(screen.queryByText('Waste Collection')).not.toBeInTheDocument();
    });
  });

  it('announces result count via aria-live region', async () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Waste Collection')).toBeInTheDocument();
    });

    vi.useFakeTimers();

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'tax' } });

    vi.advanceTimersByTime(300);

    vi.useRealTimers();

    await waitFor(() => {
      expect(screen.getByText(/1 result found/i)).toBeInTheDocument();
    });
  });
});

describe('Services page accessibility', () => {
  it('should have no accessibility violations', async () => {
    api.fetchAllServices.mockResolvedValue(mockServices);

    const { container } = render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});