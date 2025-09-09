import { useEffect, useState } from 'react';

interface PlayerBoxesProps {
  numOfPlayers: number;
  winnerIndex: number | null;
  setWinnerIndex: (index: number | null) => void;
  resetWinsTrigger: number;
  scores: (number | string)[];
  playerNames: string[];
  setPlayerNames: (names: string[]) => void;
  setScores: (scores: (number)[]) => void;
}

function PlayerBoxes({ numOfPlayers, setWinnerIndex, resetWinsTrigger, scores, playerNames, setPlayerNames, setScores }: PlayerBoxesProps) {

  useEffect(() => {
    setWins(Array(numOfPlayers).fill(false));
  }, [resetWinsTrigger, numOfPlayers]);

  const [wins, setWins] = useState<boolean[]>(Array(numOfPlayers).fill(false));

  const playerBoxes = Array.from({ length: numOfPlayers }, (_, index) => (
    <div
      key={index}
      style={{
        border: '2px solid #333',
        padding: '30px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingLeft: '0px',
        borderRadius: '0px',
        backgroundColor: '#ffffffff',
        width: '95%',
        maxWidth: '400px',
      }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottom : '2px solid #333',
        backgroundColor: '#F2E8DA',
      }}>
        <div style={{
          width: '50%',
        }}>
          <input
            type="text"
            placeholder={`Player ${index + 1}`}
            value={playerNames[index] || ''}
            onChange={e => {
              const updatedNames = [...playerNames];
              updatedNames[index] = e.target.value;
              setPlayerNames(updatedNames);
            }}
            style={{
              width: '100%',
              height: '100%',
              fontSize: '1.5rem',
              color: 'black',
              border: 'none',
              borderRadius: '0px',
              outline: 'none',
              float: 'left',
              padding: '0px',
              backgroundColor: '#F2E8DA',
            }}
          />
        </div>

        <div style={{
          width: '20%',
        }}>
          <input
            type="number"
            placeholder="0"
            value={scores[index] === 0 || scores[index] === "0" ? "" : scores[index]}
            onChange={e => {
              const val = e.target.value;
              const updatedScores = [...scores];
              updatedScores[index] = val === "" ? "" : Number(val);
              // Always pass number[] to setScores
              setScores(updatedScores.map(s => s === "" ? 0 : Number(s)));
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#F2E8DA',
              fontSize: '1.5rem',
              color: 'black',
              border: 'none',
              padding: '0px',
            }}  
          />
        </div>

        <div
          style={{
            backgroundColor: '#F2E8DA',
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: '2px solid #333',
          }}
        >
          <img
            src={wins[index] ? "/win-win.png" : "/grey-win.png"}
            alt={wins[index] ? "Win Icon" : "Grey Win Icon"}
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
            onClick={() => {
              setWinnerIndex(index);
              const updatedWins = Array(numOfPlayers).fill(false);
              updatedWins[index] = true;
              setWins(updatedWins);
            }}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '10px',
      alignItems: 'center',
    }}>
      {playerBoxes}
    </div>
  );
}

export default PlayerBoxes;