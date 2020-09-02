import { createSelector } from 'reselect';
import { ReduxState } from '..';

// Nunca manipular diretamente o getState, sempre usar atraves de dependecias de outra funcao
const getState = (state: ReduxState) => state.cart;

const getFailedStockCheck = createSelector([getState], (state) => {
  console.log(state.failedStockCheck)
  return state.failedStockCheck
});

const testSelector = createSelector([getFailedStockCheck], (failedStockCheck) => {
  console.log('teste 2')
  return true;
})

export default Object.freeze({
  getFailedStockCheck,
  testSelector
})