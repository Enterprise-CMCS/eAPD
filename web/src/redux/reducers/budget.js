import { RESET } from '../actions/app';
import { UPDATE_BUDGET } from '../actions/budget';
import {
  defaultBudgetObject,
  calculateBudget
} from '@cms-eapd/common/utils/budget';

// eslint-disable-next-line default-param-last
const reducer = (state = defaultBudgetObject([]), action) => {
  switch (action.type) {
    case RESET:
      return {};
    case UPDATE_BUDGET:
      return calculateBudget(action.state.apd);
    default:
      return state;
  }
};

export default reducer;
