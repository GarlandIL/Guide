import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import Services from '../../pages/Services/Services';
import { fetchAllServices } from '../../services/api';

vi.mock('../../services/api');

describe('Services page accessibility', () => {
  it('should have no accessibility violations', async () => {
    fetchAllServices.mockResolvedValue([
      { id: 1, name: 'Test Service', description: 'Test description' }
    ]);

    const { container } = render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});