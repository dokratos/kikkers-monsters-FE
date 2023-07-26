import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/reduxHooks';
import { Link } from 'react-router-dom';
import { fetchPlayers } from '../slices/userSlice';
import './winning.css';

const Winning = () => {
const dispatch = useAppDispatch();
const message = useAppSelector(state => state.game.message);
const playerStatus = useAppSelector(state => state.players.status);

useEffect(() => {
  if (playerStatus === 'posted') dispatch(fetchPlayers);
}, []);

return (
  <main className='win-land'>
    <article className='gpt-message'>
      <h2>{message}</h2>
    </article>
    <Link className='play' to='/'>Play Again!</Link>
  </main>
  )
}

export default Winning
