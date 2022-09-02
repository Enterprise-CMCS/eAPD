import { PRINT_APD } from './symbols';

export const printApd =
  ({ global = window } = {}) =>
  dispatch => {
    dispatch({ type: PRINT_APD });
    global.print();
  };

export default { printApd };
