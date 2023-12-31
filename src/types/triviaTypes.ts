export default interface ITrivia {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  shuffled_answer: string[]
}