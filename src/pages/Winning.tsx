import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/reduxHooks';
import { fetchPlayers } from '../slices/userSlice';
import './winning.css';
import { Link } from 'react-router-dom';

const Winning = () => {
const dispatch = useAppDispatch();
const message = useAppSelector(state => state.game.message);
const players = useAppSelector(state => state.players.players);
const playerStatus = useAppSelector(state => state.players.status);

useEffect(() => {
  if (playerStatus === 'posted') dispatch(fetchPlayers);
}, []);

return (
  <main className='win-land'>
    <article>
      <h2>{message}</h2>
    </article>
    <article>
      {players.map((player, i) => {
        return (<div key={i}>
          <p>{player.userName}</p>
          <p>{player.score}</p>
        </div>)
      })}
    </article>
    <Link to='/'>Play Again!</Link>
  </main>
  )
}

export default Winning