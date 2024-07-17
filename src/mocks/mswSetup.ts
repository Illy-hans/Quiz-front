import { setupServer } from 'msw/node';
import { Handlers} from './handler';

// This function sets up the handlers for the Mock Service Worker 
// The individual functions are specific to test cases and listed in handler.ts
export const server = setupServer(...Handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());