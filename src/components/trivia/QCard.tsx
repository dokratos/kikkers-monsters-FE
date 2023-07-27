import './questionCard.css'

interface QCardProps {
  question: string,
  answers: string[],
  check: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const QCard = ({question, answers, check}: QCardProps) => {

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
