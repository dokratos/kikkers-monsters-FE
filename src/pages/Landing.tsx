import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { fetchPlayers } from '../slices/userSlice';
import MemoryForm from '../components/memory/MemoryForm';
import TriviaForm from '../components/trivia/TriviaForm';
import './landing.css'

const Landing = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const players = useAppSelector(state => state.players.players);

  useEffect(() => {
    if (players.length <= 1) {
      dispatch(fetchPlayers())
    }
  }, []);

  return (
    <main className="landing">
      <MemoryForm />
      <TriviaForm />
      <article className='intro'>
        <h1>Welcome to Kikkers&Monsters!</h1>
        <p>Since you are here, we believe you want to enjoy our awesome memory game. 
          Choose a theme and the amount of cards you want to play with: between 5 and 25. 
          And ...start!</p>
      </article>
    </main>
  );
};

export default Landing;
