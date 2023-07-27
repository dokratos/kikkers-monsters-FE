import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { selectImages } from "../slices/memorySlice";
import { setFinalScore } from '../slices/scoreSlice';
import VictoryForm from '../components/VictoryForm';
import Spinner from "../components/Spinner";
import NoGame from '../components/NoGame';
import "./memory.css";

const MemoryGame = () => {
  const [firstUrl, setFirstUrl] = useState<string | null>('');
  const [secondUrl, setSecondUrl] = useState<string | null>('');
  const [firstCard, setFirstCard] = useState<HTMLElement | null>();
  const [secondCard, setSecondCard] = useState<HTMLElement | null>();
  const [loading, setLoading] = useState<string>('');
  const [win, setWin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [score, setScore] = useState(0);
  const images: string[] = useAppSelector(selectImages);
  const cardStatus = useAppSelector((state) => state.memory.status);

  useEffect(() => {
    if (firstUrl !== '' && secondUrl !== '') {
      check();
    }
  }, [secondUrl])

  const flip = (event: React.MouseEvent<HTMLDivElement>) => {
    if (loading === 'loading') return;
    if (event.currentTarget.className === 'flip-box flipped') return;
    setLoading('loading');
    event.currentTarget.classList.add('flipped');
    if (firstUrl === '') {
      setFirstCard(event.currentTarget);
      setFirstUrl(event.currentTarget.getElementsByTagName('img')[0].getAttribute('src'));
      return;
    }
    setSecondCard(event.currentTarget);
    setSecondUrl(event.currentTarget.getElementsByTagName('img')[0].getAttribute('src'));
  }
  
  if (loading === 'loading') {
    setTimeout(() => {
      setLoading('');
    }, 900);
  }

  const check = () => {
    const isMatch: boolean = firstUrl === secondUrl;
    isMatch ? removeCards() : unflipCards();
  }

  const removeCards = () => {
    setTimeout(() => {
      firstCard?.classList.add('removed');
      secondCard?.classList.add('removed');
      setScore(score + 2);
      resetBoard();
    }, 800);
  }
  
  const unflipCards = () => {
    setTimeout(() => {
      firstCard?.classList.remove('flipped');
      secondCard?.classList.remove('flipped');
      resetBoard();
    }, 800);
  }

  const resetBoard = () => {
    setFirstUrl('');
    setSecondUrl('');
    setSecondCard(null);
    setFirstCard(null);
  }

  if (score === images.length && images.length > 0) {
    dispatch(setFinalScore(score))
    setTimeout(() => {
      setWin(true);
    }, 800)
  }

  return (
    <>
    <main className='main-memory'>
      <h3>SCORE_ {score}</h3>
      <section className="memory-board">
        {cardStatus === "loading" && <Spinner newStyle='memory-spinner'/>}
        {(cardStatus === 'playing' || cardStatus === 'rejected') 
          && images.length < 8 && <NoGame />}
        {win && <VictoryForm newStyle='win-section'/>}
        {images.length > 8 && images?.map((img, i) => {
          return (
            <div
            className="flip-box"
            onClick={e => flip(e)}
            key={i}>
              <div 
              className="flip-box-inner"
              >
                <div className="flip-box-front">
                  <img
                    src={img}
                    className="memory-card"
                  />
                </div>
                <div className="flip-box-back"></div>
              </div>
          </div>
          );
        })}
      </section>
    </main>
    </>
  );
};

export default MemoryGame;
