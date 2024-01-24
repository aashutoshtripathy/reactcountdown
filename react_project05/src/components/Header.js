import logoImg from '../assets/quiz-logo.png'
import React from 'react'

const Header = () => {
  return (
    <header>
        <img src={logoImg} alt='Logo' />
        <h1>ReactQuiz</h1>
    </header>
  )
}

export default Header