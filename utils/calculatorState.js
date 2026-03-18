import { MAX_INPUT_LENGTH } from '../constants/calculatorConfig';
import { calculate } from './calculate';

export const INITIAL_CALCULATOR_STATE = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  shouldResetDisplay: false,
};

export function applyCalculatorInput(state, label, variant) {
  if (label === 'AC') {
    return { ...INITIAL_CALCULATOR_STATE };
  }

  if (label === 'DEL') {
    return handleDelete(state);
  }

  if (variant === 'number' && /^\d$/.test(label)) {
    return handleNumber(state, label);
  }

  if (label === '.') {
    return handleDecimal(state);
  }

  if (variant === 'operator' && label !== '=') {
    return handleOperator(state, label);
  }

  if (label === '=') {
    return handleEquals(state);
  }

  return state;
}

function handleNumber(state, digit) {
  if (state.shouldResetDisplay) {
    return {
      ...state,
      currentValue: digit,
      shouldResetDisplay: false,
    };
  }

  if (state.currentValue === '0') {
    return {
      ...state,
      currentValue: digit,
    };
  }

  if (
    state.currentValue === 'Error' ||
    state.currentValue.length >= MAX_INPUT_LENGTH
  ) {
    return state;
  }

  return {
    ...state,
    currentValue: `${state.currentValue}${digit}`,
  };
}

function handleDecimal(state) {
  if (state.shouldResetDisplay) {
    return {
      ...state,
      currentValue: '0.',
      shouldResetDisplay: false,
    };
  }

  if (state.currentValue.includes('.')) {
    return state;
  }

  if (
    !state.currentValue ||
    state.currentValue === '0' ||
    state.currentValue === 'Error'
  ) {
    return {
      ...state,
      currentValue: '0.',
    };
  }

  if (state.currentValue.length >= MAX_INPUT_LENGTH) {
    return state;
  }

  return {
    ...state,
    currentValue: `${state.currentValue}.`,
  };
}

function handleOperator(state, nextOperator) {
  if (state.currentValue === 'Error') {
    return state;
  }

  if (state.shouldResetDisplay && state.previousValue !== null) {
    return {
      ...state,
      operator: nextOperator,
    };
  }

  if (state.previousValue !== null && state.operator) {
    const result = calculate(
      state.previousValue,
      state.currentValue,
      state.operator
    );

    return {
      ...state,
      currentValue: result,
      previousValue: result === 'Error' ? null : result,
      operator: result === 'Error' ? null : nextOperator,
      shouldResetDisplay: true,
    };
  }

  return {
    ...state,
    previousValue: state.currentValue,
    operator: nextOperator,
    shouldResetDisplay: true,
  };
}

function handleEquals(state) {
  if (!state.operator || state.previousValue === null || state.shouldResetDisplay) {
    return state;
  }

  const result = calculate(
    state.previousValue,
    state.currentValue,
    state.operator
  );

  return {
    ...state,
    currentValue: result,
    previousValue: null,
    operator: null,
    shouldResetDisplay: true,
  };
}

function handleDelete(state) {
  if (state.shouldResetDisplay || state.currentValue === 'Error') {
    return {
      ...state,
      currentValue: '0',
      shouldResetDisplay: false,
    };
  }

  const nextValue = state.currentValue.slice(0, -1);

  return {
    ...state,
    currentValue: nextValue || '0',
  };
}
