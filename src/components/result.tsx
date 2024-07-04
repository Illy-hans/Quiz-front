
interface ResultProps {
    score: number;
}

export const Result = ({ score }: ResultProps) => { 

return (
    <div className="quiz-container">
        <h1 className="text-h1">Quiz Completed</h1>
        <p>Your score is {score} out of 5 </p>
    </div>
);
};