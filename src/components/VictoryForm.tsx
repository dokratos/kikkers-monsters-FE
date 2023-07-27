import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/reduxHooks';
import { postPlayer } from '../slices/userSlice';
import { getMessage } from '../slices/gameSlice';
import Spinner from './Spinner';
import './victoryForm.css'

interface VictoryFormProps {
  newStyle: string
}

const VictoryForm = ({newStyle}: VictoryFormProps) => {
  const score = useAppSelector(state => state.score.score);
  const theme = useAppSelector(state => state.game.theme);
  const game = useAppSelector(state => state.game.game);
  const gameStatus = useAppSelector(state => state.game.status);
  const playerStatus = useAppSelector(state => state.players.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (gameStatus === 'idle') {
      dispatch(getMessage({theme, game}))
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

  let message: string;
  if (game === 'memory card') {
    message = `You win! and your score is: ${score}`;
  } else {
    message = `You got your chances and your final score is ${score}`;
  }

  return (
      <section className={newStyle}>
        {playerStatus === 'posting' && <Spinner newStyle='trivia-spinner'/>}
        <h1>{message}</h1>
        <form
        className='winner'
        onSubmit={postNew}
        >
          <input
          className='winner-input'
          type='text'
          placeholder='your name is: ...'
          required
          onChange={e => setPlayerName(e.target.value)}
        ></input>
          <button
          className='winner-button'
          >Save your game</button>
        </form>
        {playerStatus === 'posted' && 
          <Link 
          className='congrats'
          to='/win'>Get Congrats!</Link>}
        </section>
    )
}

export default VictoryForm