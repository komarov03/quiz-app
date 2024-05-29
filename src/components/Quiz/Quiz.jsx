import React, { useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
import { useState } from 'react';

const Quiz = () => {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0)
  let [result, setResult] = useState(false)

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (el, ans) => {
    if (lock === false) {
      if (question.rightAnswer === ans) {
        el.target.classList.add('correct');
        setLock(true);
        setScore(prev => prev + 1)
      } else {
        el.target.classList.add('wrong');
        setLock(true);
        option_array[question.rightAnswer-1].current.classList.add('correct')
      }
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true)
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index])
      setLock(false)
      option_array.map((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className='container'>
        <h1>"Отгадайка!"</h1>
        <hr />
        {result? <></> : <>
        <h2>{index+1}. {question.question}</h2>
        <ul>
          <li ref={Option1} onClick={(el)=>{checkAns(el,1)}}>{question.option1}</li>
          <li ref={Option2} onClick={(el)=>{checkAns(el,2)}}>{question.option2}</li>
          <li ref={Option3} onClick={(el)=>{checkAns(el,3)}}>{question.option3}</li>
          <li ref={Option4} onClick={(el)=>{checkAns(el,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Дальше</button>
        <div className="index">{index+1} из {data.length} вопросов</div>
        </>}
        {result? <><h2>Вы заработали {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>: <></>}
    </div>
  )
}

export default Quiz