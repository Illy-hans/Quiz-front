
const backendUrl: string = "http://127.0.0.1:3000"; 

interface QuizQuestion {
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

interface QuizResponse {
    questions: QuizQuestion[];
}

export const getQuiz = async (category: string): Promise<QuizQuestion[]> => {

    try {

        const url: URL = new URL(`${backendUrl}/questions`);
        if (category) {
            url.searchParams.append('category', category);
        }

        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(url.toString(), requestOptions);

        if (!response.ok) { // This checks for any response status outside the 200-299 range
            throw new Error(`Unable to fetching questions: ${response.statusText}`);
        }

        const data: QuizResponse = await response.json();

        return data.questions;

    } catch (error) {

        console.error("Fetch error:", error);
        throw error; // Allows for catching and handling the error in the component
}
};


