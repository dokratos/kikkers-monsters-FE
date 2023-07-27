import { useEffect, useState } from "react";
import { selectQuestions } from "../slices/triviaSlice";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { saveTheme } from "../slices/gameSlice";
import Spinner from "../components/Spinner";
import QCard from "../components/trivia/QCard";
import "./triviaGame.css";
import ITrivia from "../types/triviaTypes";
import { setFinalScore } from "../slices/scoreSlice";
import VictoryForm from "../components/VictoryForm";
import NoGame from "../components/NoGame";

const TriviaGame = () => {
  const dispatch = useAppDispatch();
  const triviaStatus = useAppSelector((state) => state.trivia.status);
  const questions: ITrivia[] = useAppSelector(selectQuestions);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<string>('')
  const [score, setScore] = useState<number>(0);
  const slides = document.getElementsByClassName("slide");
  
  const check = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.parentElement?.classList.add('answered');
    if (correct === e.currentTarget.innerText) {
      setScore(score + 1);
      e.currentTarget.classList.add('green');
    } else {
      e.currentTarget.classList.add('red');
    }
  }
  console.log(triviaStatus)
  const handleResult = () => {
    dispatch(saveTheme(questions[0]?.category));
    dispatch(setFinalScore(score));
    setEndGame(true);
  };
 
  useEffect(() => {
      slides[0]?.classList.add("slideShow");
      setCorrect(questions[0]?.correct_answer);
  }, [triviaStatus]);

  const plusSlides = (n: number) => {
    if (slideIndex < questions.length - 1) {
      showSlides(slideIndex + n);
      setCorrect(questions[slideIndex + n]?.correct_answer);
      setSlideIndex(slideIndex + n);
    } else {
      handleResult();
    }
  };

  const showSlides = (n: number) => {
    for (let i = 0; i < slides.length; i++) {
      slides[i]?.classList.remove("slideShow");
    }
    slides[n]?.classList.add("slideShow");
  };

  return (
    <main className="trivia-page">
      {triviaStatus === "loading" && <Spinner newStyle='trivia-spinner'/>}
      <h3>SCORE_ {score}</h3>
      <section className="trivia-box">
        {(triviaStatus === "playing" || triviaStatus === "rejected") &&
          questions?.length < 3 && <NoGame />}
        {!endGame && (
          <div className="trivia-carousel">
            {questions?.map((question, key) => {
              return (
                <div key={key} className="slide fade">
                  <QCard
                    check={check}
                    question={question.question}
                    answers={question.shuffled_answer}
                  />
                </div>
              );
            })}
            <a className="next" onClick={() => plusSlides(1)}>
              &#10095;
            </a>
          </div>
        )}
      </section>
        {endGame && <VictoryForm newStyle='trivia-winner'/>}
    </main>
  );
};

export default TriviaGame;
