export default function QuestionBlock({
  question,
  options,
  selected,
  handleAnswer,
  correct,
  feedback,
}) {
  return (
    <div className="questionDiv fade-in">
      <h2>{question}</h2>
      <ul>
        {options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => handleAnswer(opt)} disabled={selected !== null}>
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <p>
          {correct ? (
            <><i className="fa-solid fa-check" style={{ color: 'limegreen' }}></i> {feedback}</>
          ) : (
            <><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> {feedback}</>
          )}
        </p>
      )}
    </div>
  );
}