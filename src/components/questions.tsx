import { useState, useEffect } from "react";
import getQuiz from "../services/questions";

type QuizQuestion = {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export const Quiz = () => {

    const [questions, setQuestions] = useState<QuizQuestion[]>();
    const [category, setCategory] = useState<string>("");
    // const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    // const [question, choices, correctAnswer] = questions[currentQuestion];


    useEffect(() => {
        const fetchQuestions = async (): Promise<void> => {
            try {
                const questionsData = await getQuiz(category);
                setQuestions(questionsData)

            } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
    fetchQuestions();
}, [category]);

    const chooseCategory = (e): void => {
        setCategory(e.target.value)
    };
    

    return (
        <>
            <div className="quiz-container">
            <h2> Choose category: </h2>
            <button value="General Knowledge" onClick={chooseCategory}>General Knowledge</button>
            <button value="History" onClick={chooseCategory}>History</button>
            <button value="Entertainment: Film" onClick={chooseCategory}>Film</button>
            <button value="Entertainment: Television" onClick={chooseCategory}>TV</button>

            <p>Selected Category: {category}</p>

            <ul>

            {questions?.map((question, index) => (
                    <li key={index}>
                        <p><strong>Question:</strong> {question.question}</p>
                        <ul>
                            <div>
                            <p> {question.correct_answer} </p>
                            </div>
                            {question.incorrect_answers.map((answer, index) => (
                            <div> 
                                <p key={index}>{answer}</p>
                            </div>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
};

// a form with one answer - handleClick - 

