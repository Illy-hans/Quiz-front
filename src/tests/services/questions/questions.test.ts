import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import getQuiz from '../../../services/questions';
import { server } from '../../../mocks/mswSetup';
import { Handlers } from '../../../mocks/handler';


describe('questions', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should return 5 random question objects', async () => {
        server.use(Handlers[6])
        const data = await getQuiz(null)
        const questions = data.questions

        // Check if questions is an array
        expect(data.questions).toHaveLength(5);
        questions.forEach(question => {
            expect(question).toHaveProperty('_id');
            expect(question).toHaveProperty('question');
            expect(question).toHaveProperty('category');
            expect(question).toHaveProperty('correct_answer');
            expect(question).toHaveProperty('incorrect_answers');
            });
        });

    it('should return 5 questions of the same category', async () => {
        server.use(Handlers[7])
        const sameCategory = await getQuiz('History')
        const questions1 = sameCategory.questions

        expect(questions1).toHaveLength(5);
        questions1.forEach(question => {
            expect(question).toHaveProperty('_id');
            expect(question).toHaveProperty('question');
            expect(question).toHaveProperty('category', 'History');
            expect(question).toHaveProperty('correct_answer');
            expect(question).toHaveProperty('incorrect_answers');
            });


    })
});

