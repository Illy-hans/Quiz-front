import { useState, useEffect, MouseEvent } from "react";
import { QuizQuestion } from "../services/questions";

interface QuizProps {
    questions: QuizQuestion[] | undefined;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Quiz = ({ questions, category, setCategory}: QuizProps) => {

    const chooseCategory = (e: MouseEvent<HTMLButtonElement>): void => {
        setCategory(e.currentTarget.value)
    };

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answerIndex, setAnswerIndex] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');

    const onAnswerClick = (answer, index) => {
        setAnswerIndex(index);
        if (answer === correct_answer) {
            setAnswer(true);
        } else {
            setAnswer(false)
        }
    };

    if (!questions || questions.length === 0) {
        return <div>Loading...</div>; // Handle loading state or no questions case
    }

    const { question, incorrect_answers, correct_answer } = questions[currentQuestion];


    return (
        <>
            <div className="quiz-container">
                <span className="active-question">{currentQuestion + 1}/</span> 
                <span className="total-questions">{questions.length}</span> 

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
                                <p 
                                key={index}>{answer}</p>
                            </div>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
                {/* <button onClick={prevQuestion} disabled={currentQuestion === 0}>Previous</button>
                <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>Next</button> */}
            </div>
        </>
    )
};

// a form with one answer - handleClick - 

