export default function handleAnswer({
  answer,
  correctValue,
  setSelected,
  setCorrect,
  setFeedback,
  correctText,
  incorrectText,
  nextQuestion,
  setScore,
  setWrongAnswer,
  setCurrentQuestion,
}) {
  setSelected(answer);
  const isCorrect = answer === correctValue;

  setFeedback(isCorrect ? correctText : `${incorrectText} ${correctValue}`);
  setCorrect(isCorrect);
  
  if (isCorrect) {
      setScore(prev => prev + 1);

    } else {
        setWrongAnswer(prev => prev + 1);
    }
    setTimeout(() => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}, 0)
    setTimeout(() => {
    setCurrentQuestion(nextQuestion);
  }, 1500);
}