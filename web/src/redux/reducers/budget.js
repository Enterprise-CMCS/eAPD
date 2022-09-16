import { RESET } from '../actions/app';
import { UPDATE_BUDGET, UPDATE_BUDGET_FAILURE } from '../actions/budget';
import { defaultBudgetObject } from '@cms-eapd/common/utils/budget';

// eslint-disable-next-line default-param-last
const reducer = (state = defaultBudgetObject([]), action) => {
  switch (action.type) {
    case RESET:
      return {};
    case UPDATE_BUDGET:
      return action.budget;
    case UPDATE_BUDGET_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;
