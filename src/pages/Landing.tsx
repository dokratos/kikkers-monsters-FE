import React, { useState, useEffect } from "react";
import { persistor } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { fetchImages } from "../slices/memorySlice";
import { fetchPlayers } from '../slices/userSlice';
import { saveTheme } from '../slices/gameSlice';
import { useNavigate } from "react-router-dom";
import './landing.css'

const Landing = () => {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState<number>(5);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const players = useAppSelector(state => state.players.players);

  useEffect(() => {
    if (players.length <= 1) {
      dispatch(fetchPlayers())
    }
  }, []);
  
  const playMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    persistor.purge();
    localStorage.removeItem('persist:root');
    dispatch(saveTheme(query))
    dispatch(fetchImages({ query, amount }));
    navigate("/memory");
  };

  return (
    <main className="landing">
      {/* {status === 'rejected' && <p>Oops.. we couldn't get enough cards for you, try something else!</p>} */}
      <article className='memory-choose'>
        <form className="memory-game-form" onSubmit={playMemory}>
          <input
            type="text"
            placeholder='Choose a theme...'
            onChange={(e) => setQuery(e.target.value)}
            required
          ></input>
          <input
            type="number"
            min="5"
            onChange={(e) => setAmount(Number(e.target.value))}
          ></input>
          <button>Play!</button>
        </form>
      </article>
      <article className='intro'>
        <h1>Welcome to Kikkers&Monsters!</h1>
        <p>Since you are here, we believe you want to enjoy our awesome memory game. 
          Choose a theme and the amount of cards you want to play with and ...start!</p>
      </article>
    </main>
  );
};

export default Landing;
