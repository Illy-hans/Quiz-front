
const backendUrl: string = "http://127.0.0.1:3000"; 

export interface QuizQuestion {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizResponse {
    questions: QuizQuestion[];
}

export default async function getQuiz(category: string | null): Promise<QuizQuestion[]> {

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

        const response: Response = await fetch(url.toString(), requestOptions);

        if (!response.ok) {
            throw new Error(`Unable to fetching questions: ${response.statusText}`);
        }

        const data: QuizResponse = await response.json();

        // console.log(data)
        // console.log(data.questions)
        return data.questions;


    } catch (error) {

        console.error("Fetch error:", error);
        throw error; 
    }
}


