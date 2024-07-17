import { setupServer } from 'msw/node';
import { Handlers} from './handler';

export const server = setupServer(...Handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());