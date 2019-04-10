import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// to optimize bundle, explicitly importing only the icons used
import {
  faArrowRight,
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faEdit,
  faExclamationTriangle,
  faLock,
  faPlusCircle,
  faSpinner,
  faUnlock,
  faUserCog,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import { faCircle, faClock } from '@fortawesome/free-regular-svg-icons';

const LockIcon = () => <FontAwesomeIcon icon={faLock} />;
const UnlockIcon = () => <FontAwesomeIcon icon={faUnlock} />;

export {
  faArrowRight,
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faCircle,
  faClock,
  faEdit,
  faExclamationTriangle,
  faLock,
  faPlusCircle,
  faSpinner,
  faUnlock,
  LockIcon,
  UnlockIcon,
  faUserCog,
  faUserPlus
};

export default FontAwesomeIcon;
