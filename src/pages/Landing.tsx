import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { fetchPlayers } from '../slices/userSlice';
import MemoryForm from '../components/memory/MemoryForm';
import TriviaForm from '../components/trivia/TriviaForm';
import './landing.css'

const Landing = () => {
  const dispatch = useAppDispatch();
  const [showMemory, setShowMemory] = useState<boolean>(false);
  const [showTrivia, setShowTrivia] = useState<boolean>(false);
  const players = useAppSelector(state => state.players.players);

  useEffect(() => {
    if (players.length <= 1) {
      dispatch(fetchPlayers())
    }
  }, []);

  return (
    <main className="landing">
      <div className='accordion-box'>
        <button 
        className='accordion'
        onClick={() => setShowMemory(!showMemory)}>Memory Card</button>
        {showMemory && <MemoryForm />}
        <button 
        className='accordion'
        onClick={() => setShowTrivia(!showTrivia)}>Trivia</button>
        {showTrivia && <TriviaForm />}
      </div>
      <article className='intro'>
        <h1>Welcome to Kikkers&Monsters!</h1>
        <p>Since you are here, we believe you want to enjoy one of our awesome games. Pick the one you prefer and ...start!</p>
      </article>
    </main>
  );
};

export default Landing;
