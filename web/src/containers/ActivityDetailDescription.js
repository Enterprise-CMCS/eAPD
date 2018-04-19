import PropTypes from 'prop-types';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import Icon, { faHelp } from '../components/Icons';
import { EDITOR_CONFIG } from '../util';

class ActivityDetailDescription extends Component {
  constructor(props) {
    super(props);

    const { descLong } = props.activity;

    const descLongEditor = !descLong
      ? EditorState.createEmpty()
      : EditorState.createWithContent(convertFromRaw(JSON.parse(descLong)));

    this.state = {
      descLongEditor
    };
  }

  onEditorChange = name => editorState => {
    // TODO [bren]: clean up / consolidate editor key name interpolation
    const key = `${name}Editor`;
    this.setState({ [key]: editorState });
  };

  syncEditorState = name => () => {
    const editorState = this.state[`${name}Editor`];
    const contentObj = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentObj);

    const { activity, updateActivity } = this.props;
    const data = { id: activity.id, name, value: JSON.stringify(contentRaw) };

    updateActivity(data);
  };

  render() {
    const { activity, updateActivity } = this.props;
    const { descLongEditor } = this.state;

    return (
      <Collapsible title="Activity Description" open>
        <div className="mb1 bold">
          Summary
          <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
        </div>
        <div className="mb3">
          <textarea
            className="m0 textarea"
            rows="5"
            maxLength="280"
            spellCheck="true"
            value={activity.descShort}
            onChange={e =>
              updateActivity({
                id: activity.id,
                name: 'descShort',
                value: e.target.value
              })
            }
          />
        </div>

        <div className="mb3">
          <div className="mb1 bold">
            Please describe the activity in detail
            <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
          </div>
          <Editor
            toolbar={EDITOR_CONFIG}
            editorState={descLongEditor}
            onEditorStateChange={this.onEditorChange('descLong')}
            onBlur={this.syncEditorState('descLong')}
          />
        </div>

        <div>ADD ALT APPROACH TEXTBOX</div>
      </Collapsible>
    );
  }
}

ActivityDetailDescription.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailDescription
);
