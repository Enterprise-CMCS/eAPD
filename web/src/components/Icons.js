import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// to optimize bundle, explicitly importing only the icons used
import {
  faArrowRight,
  faCheck,
  faTimes,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircleStop,
  faEdit,
  faExclamationTriangle,
  faFileAlt,
  faClipboardCheck,
  faLock,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faUnlock,
  faUserCog,
  faUserPlus,
  faUserShield,
  faEnvelope,
  faPeopleArrows
} from '@fortawesome/free-solid-svg-icons';

import {
  faCircle,
  faClock,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons';

const Check = ({ ...props }) => <FontAwesomeIcon icon={faCheck} {...props} />;
const Xmark = ({ ...props }) => <FontAwesomeIcon icon={faTimes} {...props} />;
const CheckCircle = ({ ...props }) => (
  <FontAwesomeIcon icon={faCheckCircle} {...props} />
);
const File = ({ ...props }) => <FontAwesomeIcon icon={faFileAlt} {...props} />;
const Envelope = () => <FontAwesomeIcon icon={faEnvelope} />;
const PDFFile = () => (
  <img src="/static/img/pdf_doc.svg" alt="PDF document icon" width="16em" />
);
const PDFFileBlue = () => (
  <img
    src="/static/icons/pdf_blue.svg"
    width="15.24px"
    height="19px"
    alt="PDF document icon"
  />
);
const LockIcon = () => <FontAwesomeIcon icon={faLock} />;
const Spinner = ({ ...props }) => (
  <FontAwesomeIcon icon={faSpinner} {...props} />
);
const TimesCircle = () => <FontAwesomeIcon icon={faTimesCircle} />;
const UnlockIcon = () => <FontAwesomeIcon icon={faUnlock} />;

const ChevronRight = () => <FontAwesomeIcon icon={faChevronRight} />;

const StopIcon = () => <FontAwesomeIcon icon={faCircleStop} />;

export {
  faArrowRight,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faClock,
  faEdit,
  faExclamationTriangle,
  faLock,
  faClipboardCheck,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faTimesCircle,
  faUnlock,
  Check,
  ChevronRight,
  CheckCircle,
  File,
  Envelope,
  PDFFile,
  PDFFileBlue,
  LockIcon,
  Spinner,
  StopIcon,
  TimesCircle,
  UnlockIcon,
  Xmark,
  faUserCog,
  faUserShield,
  faUserPlus,
  faPeopleArrows
};

export default FontAwesomeIcon;
