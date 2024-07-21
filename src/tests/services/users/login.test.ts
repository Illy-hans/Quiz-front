import { describe, it, expect } from 'vitest';
import { login, signUp } from '../../../services/users'; 
import { server } from '../../../mocks/mswSetup';
import { Handlers } from '../../../mocks/handler';

describe('login', () => {

    it('should return a token and message when the response status is 201', async () => {
        server.use(Handlers[2]);
        const result = await login('test@example.com', 'password');

        expect(result).toHaveProperty('token', 'example-token1');
        expect(result).toHaveProperty('message', 'Authentication successful');
        expect(result).toHaveProperty('username', 'example user');
        expect(result.status).toBe(201);
        
    });

    it('should return an error when the user is not found', async () => {
        server.use(Handlers[3]);

        try {
            await login("testmail@mail.com", "p098765");
        } catch (error) {
            expect(error.message).toBe('Received status 404 when logging in. Expected 201. Message: User not found');
        }
    });

    it('should return an error when the password is incorrect', async () => {
        await signUp("user1", "testmail1@mail.com", "123456789");
        server.use(Handlers[4]);

        try {
            await login("testmail1@mail.com", "123456789");
        } catch (error) {
            expect(error.message).toBe('Received status 401 when logging in. Expected 201. Message: Invalid credentials');
        }
    });

    it('should return an error when authentication fails', async () => {
        server.use(Handlers[5]);

        try {
            await login("testmail2@mail.com", "12345678910");
        } catch (error) {
            expect(error.message).toBe('Received status 400 when logging in. Expected 201. Message: Authentication failed');
        }
    });




});
