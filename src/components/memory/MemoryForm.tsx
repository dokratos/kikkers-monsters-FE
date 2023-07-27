import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store";
import { saveTheme, saveGame } from '../../slices/gameSlice';
import { fetchImages } from "../../slices/memorySlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import './memoryForm.css'

const MemoryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState<number>(5);

  const playMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    persistor.purge();
    localStorage.removeItem('persist:root');
    dispatch(saveTheme(query))
    dispatch(saveGame('memory card'))
    dispatch(fetchImages({ query, amount }));
    navigate("/memory");
  };

  return (
    <article className='memory-choose' id='memory'>
        <form className="memory-game-form" onSubmit={playMemory}>
          <p className='game-description'> Choose a theme and the amount of cards you want to play with: between 5 and 25. </p>
          <input
            type="text"
            placeholder='Choose a theme...'
            onChange={(e) => setQuery(e.target.value.replace(/ /g,''))}
            required
          ></input>
          <input
            type="number"
            min="5"
            max="25"
            onChange={(e) => setAmount(Number(e.target.value))}
          ></input>
          <button>Play!</button>
        </form>
      </article>
  )
}

export default MemoryForm