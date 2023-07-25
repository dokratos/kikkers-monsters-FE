import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/reduxHooks';
import { increment } from '../../slices/scoreSlice';
import './questionCard.css'

interface QCardProps {
  question: string,
  answers: string[],
  correct: string
}

const QCard = ({question, answers, correct}: QCardProps) => {
  const dispatch = useAppDispatch();
  const [answer, setAnswer] = useState<string | null>('')
  const shuffled = answers.sort(() => Math.random() - 0.5);
  useEffect(() => {   
    if (correct === answer) {
      console.log(answer, 'answer')
      dispatch(increment());
    }
  }, [answer])
  
  const check = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setAnswer(e.currentTarget.innerText);
    console.log(correct, 'correct')
    e.currentTarget.parentElement?.classList.add('answered')
  }

  return (
    <article className='trivia-question'>
      <h3>{question}</h3>
      {shuffled.map((answer, k) => {
        return (
          <p 
          onClick={e => check(e)}
          key={k}>{answer}</p>
        )
      })}
    </article>
  )
}

export default QCard
