export const PRINT_APD = Symbol('print : apd');

export const printApd = ({ global = window } = {}) => dispatch => {
  dispatch({ type: PRINT_APD });
  global.print();
};
