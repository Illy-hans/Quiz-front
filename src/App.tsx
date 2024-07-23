import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizComponent from './components/quiz/quizComponent';
import SignUpComponent from './components/authentication/signUp';
import LoginComponent from './components/authentication/login';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <QuizComponent />
          </>
        } />
        <Route path="/" element={<QuizComponent/>} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/quiz" element={<QuizComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
      </Routes>
    </Router>
  )
}

