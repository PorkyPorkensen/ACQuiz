import React, { useEffect, useState } from "react";
import handleAnswer from "../services/handleAnswer";

export default function Home() {
    const [villager, setVillager] = useState(null);
    const [possibleSigns, setPossibleSigns] = useState([]);
    const [possibleTraits, setPossibleTraits] = useState([])
    const [possibleNames, setPossibleNames] = useState([])
    const [selectedName, setSelectedName] = useState(null);
    const [selectedSign, setSelectedSign] = useState(null);
    const [selectedTrait, setSelectedTrait] = useState(null);
    const [signCorrect, setSignCorrect] = useState(null);
    const [nameCorrect, setNameCorrect] = useState(null);
    const [traitCorrect, setTraitCorrect] = useState(null);
    const [nameFeedback, setNameFeedback] = useState("");
    const [signFeedback, setSignFeedback] = useState("");
    const [traitFeedback, setTraitFeedback] = useState("");
    const [names, setNames] = useState([])
    const [score, setScore] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [dummyState, setDummyState] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [highScore, setHighScore] = useState(localStorage.getItem('achighscore') || 0)
    const [attemptsLeft, setAttemptsLeft] = useState(4);
    const [showModal, setShowModal] = useState(false);
    const apiKey = import.meta.env.VITE_NOOKIPEDIA_API_KEY;
    const starSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];
    const maleTraits = ["Cranky",  "Jock",  "Lazy",  "Smug"]
    const femaleTraits = ["Normal",  "Peppy",  "Snooty",  "Sisterly"]

function handleNameAnswer(answer) {
  handleAnswer({
    answer,
    correctValue: villager.name,
    setSelected: setSelectedName,
    setCorrect: setNameCorrect,
    setFeedback: setNameFeedback,
    correctText: "Correct! Nice work.",
    incorrectText: "Nope! It was",
    nextQuestion: 2,
    setScore,
    setWrongAnswer,
    setCurrentQuestion,
  });
}


function handleSignAnswer(answer) {
  handleAnswer({
    answer,
    correctValue: villager.sign,
    setSelected: setSelectedSign,
    setCorrect: setSignCorrect,
    setFeedback: setSignFeedback,
    correctText: "Correct! Nice work.",
    incorrectText: "Nope! It was",
    nextQuestion: 3,
    setScore,
    setWrongAnswer,
    setCurrentQuestion,
  });
}

function handleTraitAnswer(answer) {
  handleAnswer({
    answer,
    correctValue: villager.personality,
    setSelected: setSelectedTrait,
    setCorrect: setTraitCorrect,
    setFeedback: setTraitFeedback,
    correctText: "Correct! Nice work.",
    incorrectText: "Nope! It was",
    nextQuestion: 4,
    setScore,
    setWrongAnswer,
    setCurrentQuestion,
  });
}
  
function getTodayEST() {
  const now = new Date();

  // Convert to EST: UTC-5 or UTC-4 (Daylight Saving)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const estOffset = -4; // -5 for standard time; -4 for daylight saving time
  const est = new Date(utc + 3600000 * estOffset);

  return est.toISOString().split('T')[0]; // "YYYY-MM-DD"
}   

    useEffect(() => {
    
    const savedDate = localStorage.getItem('attemptDate');
    const today = getTodayEST();
    
      if (savedDate !== today) {
    // New day: reset attempts
    localStorage.setItem('attemptsLeft', 3);
    localStorage.setItem('attemptDate', today);
    setAttemptsLeft(4);
  } else {
    // Same day: restore saved attempts
    const savedAttempts = parseInt(localStorage.getItem('attemptsLeft')) || 0;
    setAttemptsLeft(savedAttempts);
  }

    async function fetchData() {
    try {
      const response = await fetch("https://api.nookipedia.com/villagers?game=NH", {
        headers: {
          'X-API-KEY': apiKey,
          'Accept-Version': '1.0.0'
        }
      });

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const randomNum = Math.floor(Math.random() * data.length);
      const selectedVillager = data[randomNum];
      setVillager(selectedVillager);

      // Set all names
      const nameList = data.map(v => v.name);
      setNames(nameList);

      // === NAME OPTIONS ===
      const shuffledWrongNames = nameList
        .filter(name => name !== selectedVillager.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allNames = [...shuffledWrongNames, selectedVillager.name]
        .sort(() => 0.5 - Math.random());
      setPossibleNames(allNames);

      // === SIGN OPTIONS ===
      const shuffledWrongSigns = starSigns
        .filter(sign => sign !== selectedVillager.sign)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allSigns = [...shuffledWrongSigns, selectedVillager.sign]
        .sort(() => 0.5 - Math.random());
      setPossibleSigns(allSigns);

      // === TRAIT OPTIONS ===
      const isMale = selectedVillager.gender === "Male";
      const traitPool = isMale ? maleTraits : femaleTraits;

      const shuffledWrongTraits = traitPool
        .filter(trait => trait !== selectedVillager.personality)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allTraits = [...shuffledWrongTraits, selectedVillager.personality]
        .sort(() => 0.5 - Math.random());
      setPossibleTraits(allTraits);

    } catch (error) {
      console.error("Failed to fetch villager data:", error);
    }
  }

  fetchData();
}, [totalScore, dummyState]);

useEffect(() => {
  if (attemptsLeft <= 0) {
    setShowModal(true);
  }
}, [attemptsLeft]);


    function highScoreHandler(setHighScore, highScore, totalScore){
        if (totalScore > highScore) {
            setHighScore(totalScore)
            localStorage.setItem('achighscore', totalScore)
        }
        
    }
    function dummy(){
        setTotalScore(prev => prev + 1)
        highScoreHandler(setHighScore, highScore, totalScore)
        setScore(0)
        setWrongAnswer(0)
        setSelectedName(null)
        setSelectedSign(null)
        setSelectedTrait(null)
        setNameFeedback('')
        setSignFeedback('')
        setTraitFeedback('')
        setNameCorrect(null)
        setSignCorrect(null)
        setTraitCorrect(null)
        setTraitFeedback('')
        setCurrentQuestion(1)
    }

        function failedDummy(){
        const newAttempts = Math.max(attemptsLeft - 1, 0);
        setAttemptsLeft(newAttempts);
        localStorage.setItem('attemptsLeft', newAttempts);
        highScoreHandler(setHighScore, highScore, totalScore)
        setTotalScore(0)
        setScore(0)
        setWrongAnswer(0)
        setSelectedName(null)
        setSelectedSign(null)
        setSelectedTrait(null)
        setNameFeedback('')
        setSignFeedback('')
        setTraitFeedback('')
        setNameCorrect(null)
        setSignCorrect(null)
        setTraitCorrect(null)
        setTraitFeedback('')
        setDummyState(prev => prev + 1)
        setCurrentQuestion(1)
    }
  return (
    <div className="main">
      <h1 className="headerh1">Villager Quiz</h1>
        <h2>Current Score:</h2>
        <h1 style={{color: totalScore > 0 ? 'green' : 'inherit'}}>{totalScore}</h1>
        <p>High Score: {highScore}</p>
        <h2>Attempts Left Today: {attemptsLeft}</h2>
        {showModal && (
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
            <button
                className="close-button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            <h1 className="headerh1">Villager Quiz</h1>
            <p>You’ve used all 4 attempts today.</p>
            <p>Please come back tomorrow!</p>
            </div>
        </>
        )}
      
      
      {villager && attemptsLeft > 0 ? (
        <div>
            <div className="villagerDiv">
            {/* <h2>{villager.name}</h2> */}
            <img src={villager.image_url} alt={villager.name} width="150" style={{marginBottom: "1em"}} />
            {/* <p>Personality: {villager.personality}</p> */}
            {/* <p>Species: {villager.sign}</p> */}
            </div>
          
{currentQuestion === 1 && (
  <div className="questionDiv fade-in">
    <h2>Who is this villager?</h2>
    <ul>
      {possibleNames.map((name, index) => (
        <li key={index}>
          <button
            onClick={() => handleNameAnswer(name)}
            disabled={selectedName !== null}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
    {selectedName && (
      <p>
        {nameCorrect ? (
          <><i className="fa-solid fa-check" style={{ color: 'limegreen' }}></i> {nameFeedback}</>
        ) : (
          <><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> {nameFeedback}</>
        )}
      </p>
    )}
  </div>
)}  
{currentQuestion === 2 && (
  <div className="questionDiv fade-in">
    <h2>What is {villager.name}'s star sign?</h2>
    <ul>
      {possibleSigns.map((sign, index) => (
        <li key={index}>
          <button
            onClick={() => handleSignAnswer(sign)}
            disabled={selectedSign !== null}
          >
            {sign}
          </button>
        </li>
      ))}
    </ul>
    {selectedSign && (
      <p>
        {signCorrect ? (
          <><i className="fa-solid fa-check" style={{ color: 'limegreen' }}></i> {signFeedback}</>
        ) : (
          <><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> {signFeedback}</>
        )}
      </p>
    )}
  </div>
)}

          {currentQuestion === 3 && (
  <div className="questionDiv fade-in">
    <h2>What is {villager.name}'s Personality Type?</h2>
    <ul>
      {possibleTraits.map((trait, index) => (
        <li key={index}>
          <button
            onClick={() => handleTraitAnswer(trait)}
            disabled={selectedTrait !== null}
          >
            {trait}
          </button>
        </li>
      ))}
    </ul>
    {selectedTrait && (
      <p>
        {traitCorrect ? (
          <><i className="fa-solid fa-check" style={{ color: 'limegreen' }}></i> {traitFeedback}</>
        ) : (
          <><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> {traitFeedback}</>
        )}
      </p>
    )}
  </div>
)}
{currentQuestion === 4 && (
  <div className="resultSection fade-in">
    {score >= 2 ? (
      <>
        <h2>🎉 Congrats! You got {score}/3 correct!</h2>
        <button onClick={dummy}>Next Villager</button>
      </>
    ) : (
      <>
        <h2>Womp Womp! You Failed to get 2/3 answers correct in order to continue.</h2>
        <p>Your Score is: {totalScore}</p>
        <button onClick={failedDummy}>Try Again</button>
      </>
    )}
  </div>
)}    </div>
      ) : (
        ''
      )}
    </div>
  );
}