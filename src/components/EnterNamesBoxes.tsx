import React from 'react';

interface EnterNamesBoxesProps {
	numOfPlayers: number;
	playerNames: string[];
	setPlayerNames: (names: string[]) => void;
}



function EnterNamesBoxes({ numOfPlayers, playerNames, setPlayerNames }: EnterNamesBoxesProps) {
	const nameRows = Array.from({ length: numOfPlayers }, (_, index) => (
		<div
			key={index}
			style={{
				border: '2px solid #333',
				paddingTop: '0px',
				paddingRight: '0px',
				paddingLeft: '0px',
				borderRadius: '0px',
				backgroundColor: '#ffffffff',
				width: '70%',
				maxWidth: '400px',
			}}
		>
            <div style={{ width: '100%' }}>
                <input
                    className="enter-names-input"
                    type="text"
                    placeholder={`player ${index + 1}.`}
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
                        backgroundColor: '#ffffffff',
                        textAlign: 'center',

                    }}
                />
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
			{nameRows}
		</div>
	);
}

export default EnterNamesBoxes;
