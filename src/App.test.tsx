import React, { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Set up mocks for all required services before imports
// This ensures vi.mock() hoisting doesn't cause issues
vi.mock('./services/objectionService', () => ({
  __esModule: true,
  getDocuments: vi.fn().mockResolvedValue({
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        case_id: 'T2023-1234',
        metadata: {
          name: 'Test Document 1',
          address: '123 Main St',
          license_plate: 'ABC-123',
          objection_type: 'rectification'
        },
        content: {
          type: 0,
          foulNumber: '123456',
          registerNumber: 'ABC-123',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          dueDate: null
        },
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z',
        status: { value: 'sent', label: 'Sent' }
      }
    ]
  }),
  saveObjection: vi.fn().mockResolvedValue({ status: 'success', id: '123' })
}));

vi.mock('./services/foulService', () => ({
  __esModule: true,
  getFoulData: vi.fn().mockResolvedValue({
    id: '12345',
    registerNumber: 'ABC-123',
    foulDate: '2023-01-01T12:00:00Z',
    foulLocation: 'Test Street 1',
    foulText: 'Parking violation',
    foulAmount: 80
  })
}));

vi.mock('./services/transferService', () => ({
  __esModule: true,
  getTransferData: vi.fn().mockResolvedValue({
    id: '12345',
    registerNumber: 'ABC-123',
    transferDate: '2023-01-01T12:00:00Z',
    transferLocation: 'Test Street 1',
    transferReason: 'Illegally parked',
    transferAmount: 150
  })
}));

vi.mock('./hooks/useApiToken', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue('mock-api-token')
}));

// Now import other dependencies
import renderWithProvider from './utils/renderWithProviders';
import {
  mockAuthenticatedLoginState,
  mockUnauthenticatedLoginState
} from './utils/mockLoginHooks';

describe('App', () => {
  // Reset all mocks before each test for proper isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing when user is unauthenticated', async () => {
    mockUnauthenticatedLoginState();
    await act(async () => {
      renderWithProvider(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });
  });

  it('renders without crashing when user is authenticated', async () => {
    mockAuthenticatedLoginState();
    await act(async () => {
      renderWithProvider(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });
  });
});
