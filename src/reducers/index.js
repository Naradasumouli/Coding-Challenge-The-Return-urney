const initialState = {
  input: '',
  keysToType: 'asdfjkl;',
  accuracy: 100,
  numKeysPressed: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_PRACTICE':
      return {
        ...state,
        accuracy: 100,
        numKeysPressed: 0,
      };
    case 'UPDATE_INPUT':
      return {
        ...state,
        input: action.payload,
        numKeysPressed: action.payload.length,
      };
    case 'FINISH_PRACTICE':
      return {
        ...state,
        input: '',
      };
    case 'CALCULATE_ACCURACY':
      const { input, keysToType } = action.payload;
      const numMistakes = calculateMistakes(input, keysToType);
      const totalKeys = keysToType.length;
      const accuracy = ((totalKeys - numMistakes) / totalKeys) * 100;
      return {
        ...state,
        accuracy: Math.round(accuracy),
      };
    default:
      return state;
  }
};

const calculateMistakes = (input, keysToType) => {
  let mistakes = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== keysToType[i]) {
      mistakes++;
    }
  }
  return mistakes;
};

export default reducer;
