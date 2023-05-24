export const startPractice = () => ({
  type: 'START_PRACTICE',
});

export const updateInput = (input) => ({
  type: 'UPDATE_INPUT',
  payload: input,
});

export const finishPractice = () => ({
  type: 'FINISH_PRACTICE',
});

export const calculateAccuracy = (input, keysToType) => ({
  type: 'CALCULATE_ACCURACY',
  payload: { input, keysToType },
});
