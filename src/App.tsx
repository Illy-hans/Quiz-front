import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Quiz } from './components/questions'
import getQuiz from './services/questions'

function App() {

  return (
    <>
      <div>
        <Quiz/>
      </div>
    </>
  )
}

export default App
