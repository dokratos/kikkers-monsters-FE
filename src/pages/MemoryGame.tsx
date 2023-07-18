import { useState, useEffect } from "react";
import { useAppSelector } from "../reduxHooks";
import { selectImages } from "../slices/memorySlice";
import "./memory.css";
import Spinner from '../components/Spinner';

const MemoryGame = () => {
  const [firstUrl, setFirstUrl] = useState<string | null>('');
  const [secondUrl, setSecondUrl] = useState<string | null>('');
  const [firstCard, setFirstCard] = useState<HTMLElement | null>();
  const [secondCard, setSecondCard] = useState<HTMLElement | null>();
  const [loading, setLoading] = useState<string>('');
  const status = useAppSelector(state => state.memory.status)

  // const [score, setScore] = useState(0);
  const images: string[] = useAppSelector(selectImages);

  useEffect(() => {
    if (firstUrl !== '' && secondUrl !== '') {
      check();
    }
  }, [secondUrl])

  const flip = (event: React.MouseEvent<HTMLDivElement>) => {
    if (loading === 'loading') return;
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
      resetBoard();
    }, 1000);
  }
  
  const unflipCards = () => {
    setTimeout(() => {
      firstCard?.classList.remove('flipped');
      secondCard?.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }

  const resetBoard = () => {
    setFirstUrl('');
    setSecondUrl('');
    setSecondCard(null);
    setFirstCard(null);
  }


  return (
    <section className="memory-board">
      {status === 'loading' && <Spinner />}
      {images?.map((img, i) => {
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
  );
};

export default MemoryGame;
