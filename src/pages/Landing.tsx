import React, { useState } from 'react'
import { useAppDispatch } from '../reduxHooks';
import { fetchImages } from '../slices/memorySlice';
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState<number>(0);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const playMemory = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchImages({query, amount}));
    navigate('/memory');
  }

  return (
    <main className='landing'>
      <p>Hello! Wanna play?</p>
      <form
      onSubmit={playMemory}
      >
        <input
        type='text'
        // value={query}
        onChange={e => setQuery(e.target.value)}></input>
        <input
        type='number'
        min="5"
        onChange={e => setAmount(Number(e.target.value))}></input>
        <button>Play!</button>
      </form>
    </main>
  )
}

export default Landing