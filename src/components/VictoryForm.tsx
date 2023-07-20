import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/reduxHooks';
import { postPlayer } from '../slices/userSlice';
import { getMessage } from '../slices/gameSlice';
import Spinner from './Spinner';
import './victoryForm.css'

const VictoryForm = () => {
  const score = useAppSelector(state => state.score.score);
  const theme = useAppSelector(state => state.game.theme);
  const gameStatus = useAppSelector(state => state.game.status);
  const playerStatus = useAppSelector(state => state.players.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (gameStatus === 'idle') {
      dispatch(getMessage({theme}))
    }
  }, [])
  
  useEffect(() => {
    if (gameStatus === 'won' && playerStatus === 'posted') { 
      navigate('/win')
    };
  }, [playerStatus])
  
  const postNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = playerName;
    dispatch(postPlayer({name, score}));
  }

  return (
      <section className='win-section'>
        {playerStatus === 'posting' && <Spinner />}
        <h1>You win! and your score is: {score}</h1>
        <form
        className='winner'
        onSubmit={postNew}
        >
          <input
          className='winner-input'
          type='text'
          placeholder='your name is: ...'
          onChange={e => setPlayerName(e.target.value)}
        ></input>
          <button
          className='winner-button'
          >Save your game</button>
        </form>
        </section>
    )
}

export default VictoryForm