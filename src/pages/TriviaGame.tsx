import { useState } from 'react';
import { selectQuestions } from '../slices/triviaSlice';
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { saveTheme } from '../slices/gameSlice';
import Spinner from '../components/Spinner';
import QCard from '../components/trivia/QCard';
import './triviaGame.css'
import ITrivia from '../types/triviaTypes';
import { setFinalScore } from '../slices/scoreSlice';
import VictoryForm from '../components/VictoryForm';

const TriviaGame = () => {
  const dispatch = useAppDispatch();
  const triviaStatus = useAppSelector(state => state.trivia.status);
  const score = useAppSelector(state => state.score.score);
  const questions: ITrivia[] = useAppSelector(selectQuestions);
  const [endGame, setEndGame] = useState<boolean>(false);

  const handleResult = () => {
    dispatch(saveTheme(questions[0]?.category));
    dispatch(setFinalScore(score));
    setEndGame(true);
  }

  return (
    <main className='trivia-page'>
      <h1>TriviaGame</h1>
      {triviaStatus === 'loading' && <Spinner />}
      <h3>SCORE_ {score}</h3>
      {questions?.map((question, key) => {
        return (
          <QCard
          question={question.question}
          key={key}
          correct={question.correct_answer}
          answers={question.incorrect_answers.concat(question.correct_answer)}
          /> 
          )
        })
      }
      <button onClick={handleResult}>Check Result</button>
      {endGame && <VictoryForm />}
    </main>
  )
}

export default TriviaGame