import { RESET } from '../actions/app';
import { UPDATE_BUDGET } from '../actions/budget';
import { defaultBudget, updateBudget } from '@cms-eapd/common/utils/budget';

// eslint-disable-next-line default-param-last
const reducer = (state = defaultBudget([]), action) => {
  switch (action.type) {
    case RESET:
      return {};
    case UPDATE_BUDGET:
      return updateBudget(action.state);
    default:
      return state;
  }
};

export default reducer;
