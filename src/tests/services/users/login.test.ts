import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { login } from '../../../services/users'; 
import { server } from '../../../mocks/mswSetup';
import { Handlers } from '../../../mocks/handler';

describe('login', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should return a token and message when the response status is 200', async () => {
        server.use(Handlers[2]);
        const result = await login('test@example.com', 'password');

        expect(result).toHaveProperty('token', 'example-token1');
        expect(result).toHaveProperty('message', 'Authentication successful');
        expect(result).toHaveProperty('username', 'example user');
        expect(result.status).toBe(201);
        
    });

    it('should return an error when the email is already in use', async () => {
        
    })

});
