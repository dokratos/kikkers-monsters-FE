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
  
  const check = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.parentElement?.classList.add('answered');
    if (correct === e.currentTarget.innerText) {
      dispatch(increment());
      e.currentTarget.classList.add('green')
    } else {
      e.currentTarget.classList.add('red')
    }
  }

  return (
    <article className='trivia-question'>
      <h2 className='trivia-title'>{question}</h2>
      <div className='answer-container'>
      {answers.map((answer, k) => {
        return (
          <button
          className='trivia-answer'
          onClick={e => check(e)}
          key={k}>{answer}</button>
        )
      })}
      </div>
    </article>
  )
}

export default QCard;
