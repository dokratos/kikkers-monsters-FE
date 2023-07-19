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
  <main>
      <h2>you win!</h2>
      <p>your score is: {score}</p>
      <form
      onSubmit={postNew}
      >
        <label>your name is: </label>
        <input
        type='text'
        onChange={e => setPlayerName(e.target.value)}
        ></input>
        <button>Save your game</button>
      </form>
    </main>
  )
}

export default Winning