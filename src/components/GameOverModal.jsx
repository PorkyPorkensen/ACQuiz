export default function GameOverModal({ onClose, resetTime }) {
  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal">
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="headerh1">Villager Quiz</h1>
        <p>You’ve used all 4 attempts today.</p>
        <p className="timer">Check back in: <strong>{resetTime}</strong></p>
      </div>
    </>
  );
}