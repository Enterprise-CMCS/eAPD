import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// to optimize bundle, explicitly importing only the icons used
import {
  faArrowRight,
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faEdit,
  faExclamationTriangle,
  faFileAlt,
  faLock,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faUnlock,
  faUserCog,
  faUserPlus,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import {
  faCircle,
  faClock,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons';

const Check = ({ ...props }) => <FontAwesomeIcon icon={faCheck} {...props} />;
const CheckCircle = ({ ...props }) => (
  <FontAwesomeIcon icon={faCheckCircle} {...props} />
);
const File = ({ ...props }) => <FontAwesomeIcon icon={faFileAlt} {...props} />;
const Envelope = () => <FontAwesomeIcon icon={faEnvelope} />;
const PDFFile = () => (
  <img src="../static/img/pdf_doc.svg" alt="PDF" width="16em" />
);
const LockIcon = () => <FontAwesomeIcon icon={faLock} />;
const Spinner = ({ ...props }) => (
  <FontAwesomeIcon icon={faSpinner} {...props} />
);
const TimesCircle = () => <FontAwesomeIcon icon={faTimesCircle} />;
const UnlockIcon = () => <FontAwesomeIcon icon={faUnlock} />;

export {
  faArrowRight,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faCircle,
  faClock,
  faEdit,
  faExclamationTriangle,
  faLock,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faTimesCircle,
  faUnlock,
  Check,
  CheckCircle,
  File,
  Envelope,
  PDFFile,
  LockIcon,
  Spinner,
  TimesCircle,
  UnlockIcon,
  faUserCog,
  faUserPlus
};

export default FontAwesomeIcon;
