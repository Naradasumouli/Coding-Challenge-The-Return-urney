import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startPractice,
  updateInput,
  finishPractice,
  calculateAccuracy,
} from './actions';

const App = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const { input, keysToType, accuracy, numKeysPressed } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    dispatch(updateInput(inputValue));
    dispatch(calculateAccuracy(inputValue, keysToType));
  };

  const startTimer = () => {
    dispatch(startPractice());
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
    setTimeout(() => {
      clearInterval(id);
      dispatch(finishPractice());
    }, 300000); // 5 minutes (300,000 milliseconds)
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTimer(0);
    setIntervalId(null);
  };

  return (
    <div>
      <h1>Touch Typing Practice</h1>
      <div>
        <textarea
          rows="5"
          cols="50"
          value={input}
          onChange={handleInputChange}
          placeholder="Type the given keys here..."
        />
      </div>
      <div>
        <p>Keys to Type: {keysToType}</p>
        <p>Timer: {timer} seconds</p>
        <p>Number of Keys Pressed: {numKeysPressed}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
      <div>
        {!intervalId ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={resetTimer}>Reset</button>
        )}
      </div>
    </div>
  );
};

export default App;
