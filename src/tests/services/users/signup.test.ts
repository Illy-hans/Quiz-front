import { describe, it, expect } from 'vitest';
import { signUp } from '../../../services/users'; 
import { server } from '../../../mocks/mswSetup';
import { Handlers } from '../../../mocks/handler';

describe('signUp', () => {

    it('should return a token and message when the response status is 201', async () => {
        server.use(Handlers[0]);
        const result = await signUp('testuser', 'test@example.com', 'password');

        expect(result).toHaveProperty('message', 'User created');
        expect(result).toHaveProperty('token', 'example-token');
        expect(result.status).toBe(201);
    });

    it('should return an error when the email is already in use', async () => {
        await signUp('existingUser', 'test@example.com', 'password');
        server.use(Handlers[1]);

        try {
            await signUp('testuser', 'test@example.com', 'password');
        } catch (error) {
            expect(error.message).toBe('Received status 401 when signing up. Expected 201. Message: Email already in use');
        }
    })
});

