import { useEffect, useState } from 'react'
import './App.css'
import NumberOfPlayersInput from './components/NumberOfPlayers'
import PointsPerWinInput from './components/PointsPerWin'
import PlayerBoxes from './components/PlayerBoxes'
import EnterNamesBoxes from './components/EnterNamesBoxes';

function App() {

  const [showEnterNamesButton, setShowEnterNamesButton] = useState(true);
  const [showEnterNamesBoxes, setShowEnterNamesBoxes] = useState(false);
  const [showStartGameButton, setShowStartGameButton] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showStatsInput, setShowStatsInput] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [showNewGameButton, setShowNewGameButton] = useState(true);

  const [numOfPlayers, setNumOfPlayers] = useState(0)
  const [pointsPerWin, setPointsPerWin] = useState(0);
  const [scores, setScores] = useState<(number)[]>(Array(numOfPlayers).fill(0));
  const [playerNames, setPlayerNames] = useState<string[]>(() => {
    const saved = localStorage.getItem('nerts-playerNames');
    if (saved) return JSON.parse(saved);
    return Array(numOfPlayers).fill('');
  });
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [resetWinsTrigger, setResetWinsTrigger] = useState(0);
  const [round, nextRound] = useState(1);

  if (scores.length !== numOfPlayers) {
    setScores(Array(numOfPlayers).fill(0));
  }

  console.log("winnerIndex:", winnerIndex, "scores:", scores, "round:", round);


  const handlePointsPerWinChange = (value: string) => {
    setPointsPerWin(Number(value) || 0);
  }

  const handlePlayerCountChange = (value: string) => {
    setNumOfPlayers(Number(value) || 0);
  }

  const sendToMainMenu = () => {
    setShowEnterNamesButton(false);
    setShowStatsInput(false);
    setShowStats(false);
    setShowEnterNamesBoxes(false);
    setShowStartGameButton(false);
    setStartGame(false);

    setShowContinueButton(true);
    setShowNewGameButton(true);
  }

  const continuePreviousGame = () => {
    setShowEnterNamesButton(false);
    setShowStatsInput(false);
    setShowStats(true);
    setShowEnterNamesBoxes(false);

    setShowStartGameButton(false);
    setStartGame(true);

    setShowContinueButton(false);
  }

  const startNewGame = () => {
    setShowEnterNamesButton(true);
    setShowStatsInput(true);
    setShowStats(false);
    setShowEnterNamesBoxes(false);
    setShowStartGameButton(false);
    setStartGame(false);

    setShowContinueButton(true);
    setShowNewGameButton(true);
  }

  const resetLocalStorage = () => {
    localStorage.removeItem('nerts-scores');
    localStorage.removeItem('nerts-round');
    localStorage.removeItem('nerts-playerNames');
    setScores([]);
    setPlayerNames([]);
    nextRound(1);
  }

  // Save scores, round, and playerNames to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nerts-scores', JSON.stringify(scores));
    localStorage.setItem('nerts-round', JSON.stringify(round));
    localStorage.setItem('nerts-playerNames', JSON.stringify(playerNames));
  }, [scores, round, playerNames]);

  // Restore scores and round from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('nerts-scores');
    const savedRound = localStorage.getItem('nerts-round');
    const savedNames = localStorage.getItem('nerts-playerNames');
    if (savedScores) setScores(JSON.parse(savedScores));
    if (savedRound) nextRound(JSON.parse(savedRound));
    if (savedNames) setPlayerNames(JSON.parse(savedNames));
  }, []);

  return (
    <>
      <div className="app">
        <img src="/nerts.png" className="nerts-logo" alt="Nerts Logo" style={{cursor: 'pointer'}} onClick={sendToMainMenu} />
          <div className='main-button-area'>
            <div className ="cont-prev-new-game-button-div">
              {showContinueButton && (
              <button className="cont-prev-game-button" onClick={continuePreviousGame}>
                Continue Previous Game
              </button>
              )}

              {showNewGameButton && (
              <button className="new-game-button" onClick={() => { resetLocalStorage(); sendToMainMenu(); startNewGame(); }}>
                New Game
              </button>
              )}
            </div>
            <div className="number-buttons">
              {showStatsInput && (
                <>
                  <NumberOfPlayersInput onValueChange={handlePlayerCountChange} />
                  <PointsPerWinInput onValueChange={handlePointsPerWinChange} />
                </>
              )}
            </div>
            <div className ="start-game">
                {showStartGameButton && (
                  <button 
                    className="game-button" 
                    onClick={() => { setShowStartGameButton(false); setStartGame(true); setShowEnterNamesBoxes(false);}}
                    disabled={
                      numOfPlayers <= 0 ||
                      pointsPerWin <= 0 ||
                      playerNames.length !== numOfPlayers ||
                      playerNames.some(name => name.trim() === "")
                    }
                  >
                    Start Game
                  </button>
                )}
                {showEnterNamesButton && (
                  <button
                    className='game-button'
                    onClick={() => { setShowStartGameButton(true); 
                                     setShowEnterNamesButton(false); 
                                     setShowEnterNamesBoxes(true);
                                     setShowStatsInput(false);
                                    setShowStats(true);
                                    }}
                    disabled={numOfPlayers <= 0 || pointsPerWin <= 0}
                  >
                    Add Players
                  </button>
                )}

                {startGame &&(<button className='game-button' onClick={() => {
                // Check that all scores are numbers and not empty strings
                const allValid = scores.every(s => typeof s === 'number' && !isNaN(s));
                if (!allValid) {
                  alert('Please enter a valid number for all scores before continuing.');
                  return;
                }
                if (winnerIndex !== null) {
                  const newScores = [...scores];
                  newScores[winnerIndex] += pointsPerWin;
                  setScores(newScores);
                  nextRound(round + 1);
                  setResetWinsTrigger(t => t + 1); // <--- add this line
                  setWinnerIndex(null); // <--- reset winner index for next round
                }
              }}>
                Next Round
              </button>)}
            </div>

          </div>
          <>
            <div className="game-settings">
                {showStats && (
                <>
                  <p>Number of players: {numOfPlayers}</p>
                  <p>Points per win: {pointsPerWin}</p>
                </>
               )}
            </div>
            <div>
              {startGame && <p className='round-number'>Round: {round}</p>}
            </div>
            {startGame && (<PlayerBoxes
              numOfPlayers={numOfPlayers}
              winnerIndex={winnerIndex}
              setWinnerIndex={setWinnerIndex}
              resetWinsTrigger={resetWinsTrigger}
              scores={scores}
              playerNames={playerNames}
              setPlayerNames={setPlayerNames}
              setScores={setScores}
            />)}
          </>
        {showEnterNamesBoxes && (
          <EnterNamesBoxes
            numOfPlayers={numOfPlayers}
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
          />
        )}
      </div>
    </>
  )
}

export default App