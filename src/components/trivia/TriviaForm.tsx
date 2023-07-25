import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/reduxHooks";
import { persistor } from "../../redux/store";
import { fetchQuestions } from '../../slices/triviaSlice';
import { saveGame } from '../../slices/gameSlice';
import './triviaForm.css'

const TriviaForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('3');
  const [category, setCategory] = useState<string>('9');
  const [difficulty, setDifficulty] = useState<string>('easy');

  const playTrivia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    persistor.purge();
    localStorage.removeItem('persist:root');
    dispatch(saveGame('trivia'))
    dispatch(fetchQuestions({ amount, category, difficulty }));
    navigate("/trivia");
  }
  
  return (
  <article className='trivia-'>
    <form className="trivia-form" onSubmit={playTrivia}>
      <input
        type="number"
        min="3"
        max="25"
        onChange={(e) => setAmount(e.target.value)}
      ></input>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={'9'}>General Knowledge</option>
        <option value={'10'}>Books</option>
        <option value={'17'}>Science & Nature</option>
        <option value={'20'}>Mythology</option>
        <option value={'22'}>Geography</option>
        <option value={'31'}>Anime & Manga</option>
      </select>
      <select onChange={(e) => setDifficulty(e.target.value)}>
        <option value={'easy'}>Easy</option>
        <option value={'medium'}>Medium</option>
        <option value={'hard'}>Hard</option>
      </select>
      <button>Play!</button>
    </form>
  </article>
  )
}

export default TriviaForm