import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { fetchImages } from "../slices/memorySlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import './landing.css'

const Landing = () => {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState<number>(5);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.memory.status);

  const playMemory = (e: React.FormEvent<HTMLFormElement>) => {
    localStorage.removeItem("persist:root");
    e.preventDefault();
    dispatch(fetchImages({ query, amount }));
    // if (status === 'playing')
    navigate("/memory");
  };

  return (
    <main className="landing">
      {status === "loading" && <Spinner />}
      {/* {status === 'rejected' && <p>Oops.. we couldn't get enough cards for you, try something else!</p>} */}
      <article className='memory-choose'>
        <p>Hello! Wanna play ?</p>
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
        <p>Since you are here, we believe you want to enjoy our magnificent game. Choose and start!</p>
      </article>
    </main>
  );
};

export default Landing;
