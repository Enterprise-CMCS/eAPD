import { getLaunchDarklyFlag } from '../middleware/launchDarkly.js';
import { FEATURE_FLAGS } from '@cms-eapd/common';

export const isSysAdmin = async name => {
  if (name) {
    return getLaunchDarklyFlag(
      FEATURE_FLAGS.SUPPORT_TEAM.FLAG,
      { kind: 'user', key: name, name },
      FEATURE_FLAGS.SUPPORT_TEAM.DEFAULT
    );
  }
  return FEATURE_FLAGS.SUPPORT_TEAM.DEFAULT;
};

export const hasSupportState = async name => {
  if (name) {
    return getLaunchDarklyFlag(
      FEATURE_FLAGS.SUPPORT_STATE_AVAILABLE.FLAG,
      { kind: 'user', key: name, name },
      FEATURE_FLAGS.SUPPORT_STATE_AVAILABLE.DEFAULT
    );
  }
  return FEATURE_FLAGS.SUPPORT_STATE_AVAILABLE.DEFAULT;
};
