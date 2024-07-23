import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizComponent from './components/quiz/quizComponent';
import SignUpComponent from './components/authentication/signUp';
export default function App() {


  return (
    <>
    <SignUpComponent/>
    <QuizComponent/>
    </>
  )
}

