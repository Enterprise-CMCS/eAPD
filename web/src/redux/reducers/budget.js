import { RESET } from '../actions/app';
import {
  LOAD_BUDGET,
  UPDATE_BUDGET_SUCCESS,
  UPDATE_BUDGET_FAILURE
} from '../actions/budget';
import { defaultBudgetObject } from '@cms-eapd/common/utils/budget';

// eslint-disable-next-line default-param-last
const reducer = (state = defaultBudgetObject([]), action) => {
  switch (action.type) {
    case RESET:
      return {};
    case UPDATE_BUDGET_SUCCESS:
    case LOAD_BUDGET:
      return action.budget;
    case UPDATE_BUDGET_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;
