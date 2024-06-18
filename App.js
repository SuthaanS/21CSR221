import React, { useState } from 'react';
import NumberDisplay from './NumberDisplay';
import './App.css';

const App = () => {
  const [numberId, setNumberId] = useState('e');

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };

  return (
    <div className="App">
      <h1>Average Calculator Microservice</h1>
      <select onChange={handleInputChange} value={numberId}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <NumberDisplay numberId={numberId} />
    </div>
  );
};

export default App;
