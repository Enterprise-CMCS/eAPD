import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from './redux/actions/editApd';
import { saveApd } from './redux/actions/app';
import { setLatestActivity } from './redux/actions/auth';

const saveMiddleware = (
  store,
  { saveAction = saveApd, activityAction = setLatestActivity } = {}
) => {
  let isSaving = false;
  let isQueued = false;
  let timer = null;

  const performSave = () => {
    return new Promise((resolve, reject) => {
      try {
        store.dispatch(activityAction());
        store.dispatch(saveAction()).then(resolve).catch(reject);
      } catch (e) {
        // Eat the exception. There's nothing for us to do it with it except
        // to acknolwedge that the previous save is done.
        reject(e);
      }
    });
  };

  const doSave = () => {
    // If there is a save in progress already, don't start another one because
    // we could end up sending duplicate changes and we don't know how that
    // would pan out, and also because we can't be sure what order the saves
    // will be processed on the server. So... just send one. But queue up
    // another save when this one is finished, so we don't lose track of the
    // intention here.
    if (isSaving) {
      isQueued = true;
      return;
    }

    // If we are not already saving, clear the save timer, if there is one.
    // This is how we debounce the save so that it only runs after some
    // period of user inactivity.
    if (timer) clearTimeout(timer);

    // Now set the timer for actually doing the save. It'll run 300 ms after
    // the most recent call to save.
    timer = setTimeout(async () => {
      // We're saving now. Don't allow any more saves to start.
      isSaving = true;

      performSave().finally(() => {
        // When the save is finished, we can clear that flag.
        isSaving = false;
        // If any new saves came in while we were saving, clear the queue
        // flag and setup another save to cover that.
        if (isQueued) {
          isQueued = false;
          doSave();
        }
      });
    }, 300);
  };

  return (next, { runSave = doSave } = {}) =>
    action => {
      const result = next(action);
      switch (action.type) {
        case ADD_APD_ITEM:
        case ADD_APD_YEAR:
        case EDIT_APD:
        case REMOVE_APD_ITEM:
        case REMOVE_APD_YEAR:
          runSave();
          break;
        default:
          break;
      }
      return result;
    };
};

export default saveMiddleware;
