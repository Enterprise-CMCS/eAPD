import PropTypes from 'prop-types';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import HelpBox from './HelpBox';
import FormActivityApproach from './FormActivityApproach';
import Icon, { faHelp } from './Icons';
import { EDITOR_CONFIG } from '../util';

const ActivityDescription = ({ activity }) => (
  <div>
    <div className="mb1 bold">
      Summary of the activity
      <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
    </div>

    <HelpBox>
      <p>Here is something to keep in mind...</p>
      <p className="mb0">You may also want to think about this...</p>
    </HelpBox>

    <div className="mb3">
      <textarea
        className="m0 textarea col-8"
        rows="5"
        spellCheck="true"
        maxLength="280"
        placeholder="A brief statement of what the activity involves..."
      />
    </div>

    <div className="mb3">
      <div className="mb1 bold">
        Please describe the activity
        <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
      </div>
      <Editor toolbar={EDITOR_CONFIG} />
    </div>

    <FormActivityApproach form={`activity-${activity.id}-approach`} />
  </div>
);

ActivityDescription.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ActivityDescription;
