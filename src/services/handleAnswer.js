export default function handleAnswer({
  key,
  answer,
  correctValue,
  setAnswers,
  setCorrectness,
  setFeedback,
  correctText,
  incorrectText,
  nextQuestion,
  setScore,
  setWrongAnswer,
  setCurrentQuestion,
}) {
  const isCorrect = answer === correctValue;


  setAnswers(prev => ({ ...prev, [key]: answer }));
  setCorrectness(prev => ({ ...prev, [key]: isCorrect }));
  setFeedback(prev => ({
    ...prev,
    [key]: isCorrect ? correctText : `${incorrectText} ${correctValue}`,
  }));

  if (isCorrect) {
    setScore(prev => prev + 1);
  } else {
    setWrongAnswer(prev => prev + 1);
  }

  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 0);
  setTimeout(() => {
    setCurrentQuestion(nextQuestion);
  }, 1500);
}