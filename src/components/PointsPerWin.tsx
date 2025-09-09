import { useState } from 'react';

interface PointsPerWinInputProps {
  onValueChange: (value: string) => void;
}

function PointsPerWin({ onValueChange }: PointsPerWinInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue === '' || (/^\d+$/.test(newValue) && Number(newValue) >= 0 && Number(newValue) <= 100)) {
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
            placeholder="Points given per win."
            style={{ backgroundColor: 'white', color: 'black', height: '30px', width: '190px', fontSize: '16px', padding: '5px', borderRadius: '4px' }}
        />
    );
}

export default PointsPerWin;
