import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { postPlayer } from '../slices/userSlice';

import './winning.css';

const Winning = () => {
const score = useAppSelector(state => state.score.score);
const dispatch = useAppDispatch();
const [playerName, setPlayerName] = useState<string>('');

const postNew = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const name = playerName
  dispatch(postPlayer({name, score}));
}

return (
  <main className='win-land'>
    <section className='win-section'>
      <h1>You win! and your score is: {score}</h1>
      <form
      className='winner'
      onSubmit={postNew}
      >
        <input
        type='text'
        placeholder='your name is: ...'
        onChange={e => setPlayerName(e.target.value)}
        ></input>
        <button>Save your game</button>
      </form>
      </section>
    </main>
  )
}

export default Winning