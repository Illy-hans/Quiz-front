import { useState, MouseEvent } from "react";
import { QuizQuestion } from "../services/questions";
import { Result } from "./result";
import { CategorySelector } from "./categorySelector";

interface QuizProps {
    questions: QuizQuestion[] | undefined;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Quiz = ({ questions, setCategory }: QuizProps) => {

    const chooseCategory = (e: MouseEvent<HTMLButtonElement>): void => {
        setCategory(e.currentTarget.value)
    };

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    if (!questions || questions.length === 0) {
        return <div>Loading...</div>; // Handle loading state or no questions case
    }

    const handleAnswerClick = (answer: string): void => {
        setSelectedAnswer(answer);
        setShowAnswer(true);
        if (answer === questions[currentQuestion].correct_answer) {
            setScore(prev => prev + 1)
        }
    };
    
    const handleNextQuestion = (): void => {
        setShowAnswer(false);
        setSelectedAnswer(null);
        setCurrentQuestion((prev) => prev + 1);
    };

    const { question, incorrect_answers, correct_answer } = questions[currentQuestion];

    // randomises order of answers
    const answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

    if (currentQuestion >= questions.length) {
        return (
            <Result score={score} />
        );
    }
    
    return (
        <>
            <div className="quiz-container">
                <span className="active-question">{currentQuestion + 1}/</span> 
                <span className="total-questions">{questions.length}</span> 

                <CategorySelector chooseCategory={chooseCategory}/>

                <br/>

            <div className="">
                <p className="bg-secondary"><strong>Question:</strong> {question}</p>
                <ul>
                    {answers.map((answer, index) => (
                    <li key={index} className={`btn ${showAnswer && answer === correct_answer ? 'bg-green-500' : 'bg-primary'}`} onClick={() => !showAnswer && handleAnswerClick(answer)}>
                        {answer}
                    </li>
                    ))}
                </ul>
                {showAnswer && (
                    <button className="btn bg-secondary" onClick={handleNextQuestion}>
                    {currentQuestion + 1 < questions.length ? 'Next Question' : 'Results'}
                    </button>
                )}
                </div>
            </div>
        </>
    )
};

