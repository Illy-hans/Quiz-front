import { useEffect, useState } from 'react';
import './App.css';
import { Quiz } from './components/questions';
import { QuizQuestion } from './services/questions'; //quiz interface
import getQuiz from './services/questions'; //quiz fetching service

export default function App() {

  const [questions, setQuestions] = useState<QuizQuestion[] | undefined>(undefined);
  const [category, setCategory] = useState<string>('');

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

  return (
    <>
      <div>
        <Quiz questions={questions} category={category} setCategory={setCategory}/>
      </div>
    </>
  )
}

