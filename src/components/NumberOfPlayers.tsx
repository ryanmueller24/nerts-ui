import { useState } from 'react';

interface NumberOfPlayersInputProps {
  onValueChange: (value: string) => void;
}

function NumberOfPlayers({ onValueChange }: NumberOfPlayersInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || (/^\d+$/.test(newValue) && Number(newValue) >= 0 && Number(newValue) <= 15)) {
      setInputValue(newValue);
      onValueChange(newValue); // Send value back to parent
    }
    else {
      // Invalid input, do nothing or show an error if needed
    }
  };

  return (
    <input 
      type="number" 
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter number of players."
      style={{ backgroundColor: 'white', color: 'black', height: '30px', width: '190px', fontSize: '16px', padding: '5px', borderRadius: '4px' }}
    />
  );
}

export default NumberOfPlayers;