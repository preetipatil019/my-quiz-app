import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from "./Quiz"
import {jsQuizz} from "./constant"
function App() {

  return (
    <div>
      <Quiz questions={jsQuizz.questions} />
   </div>
  )
}

export default App
