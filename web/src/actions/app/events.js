import axios from '../../util/api';
import { selectApdData } from '../../reducers/apd.selectors';

export const saveApdEvent = (eventType, metadata = null) => (
  dispatch,
  getState
) => {
  const state = getState();
  const { id: apdID } = selectApdData(state);

  return axios
    .post(`/apds/${apdID}/events`, { eventType, metadata })
    .then(res => res.data);
};

export default { saveApdEvent };
