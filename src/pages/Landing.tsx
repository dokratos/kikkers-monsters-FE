import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { fetchImages } from '../slices/memorySlice';
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';

const Landing = () => {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState<number>(5);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(state => state.memory.status)
  
  const playMemory = (e : React.FormEvent<HTMLFormElement>) => {
    localStorage.removeItem('persist:root')
    e.preventDefault();
    dispatch(fetchImages({query, amount}));
    // if (status === 'playing')
     navigate('/memory');
  }

  return (
    <main className='landing'>
       {status === 'loading' && <Spinner />}
    {/* {status === 'rejected' && <p>Oops.. we couldn't get enough cards for you, try something else!</p>} */}
      <p>Hello! Wanna play?</p>
      <form
      onSubmit={playMemory}
      >
        <input
        type='text'
        onChange={e => setQuery(e.target.value)}
        required
        ></input>
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