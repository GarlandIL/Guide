import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ServiceDetail from '../../pages/ServiceDetail/ServiceDetail';
import { fetchServiceById } from '../../services/api';

vi.mock('../../services/api');

describe('ServiceDetail focus management', () => {
  it('focuses the heading after loading service', async () => {
    fetchServiceById.mockResolvedValue({
      id: 1,
      name: 'Waste Collection',
      description: 'Test',
      contact: 'test@example.com',
      hours: '9-5',
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/services/1']}>
        <Routes>
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // jsdom does not focus elements unless the document itself has focus.
    // Attaching the container to document.body and calling focus() on the
    // document gives jsdom a real active browsing context so that
    // element.focus() calls inside useEffect actually take effect.
    document.body.appendChild(container);
    container.ownerDocument.defaultView.focus();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /waste collection/i })).toBeInTheDocument();
    });

    const heading = screen.getByRole('heading', { name: /waste collection/i });
    expect(heading).toHaveFocus();
  });
});