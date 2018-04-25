import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import Icon, { faHelp } from '../components/Icons';
import { EDITOR_CONFIG } from '../util';

const htmlToEditor = html => {
  if (!html) return EditorState.createEmpty();

  const { contentBlocks, entityMap } = htmlToDraft(html);
  const content = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(content);
};

const editorToHtml = editorState => {
  const content = convertToRaw(editorState.getCurrentContent());
  return draftToHtml(content);
};

class ActivityDetailDescription extends Component {
  constructor(props) {
    super(props);

    const { descLong, altApproach } = props.activity;

    this.state = {
      descLong: htmlToEditor(descLong),
      altApproach: htmlToEditor(altApproach)
    };
  }

  onEditorChange = name => editorState => {
    this.setState({ [name]: editorState });
  };

  syncEditorState = name => () => {
    const html = editorToHtml(this.state[name]);
    const { activity, updateActivity } = this.props;

    updateActivity(activity.id, { [name]: html });
  };

  render() {
    const { activity, updateActivity } = this.props;
    const { descLong, altApproach } = this.state;

    return (
      <Collapsible title={t('activities.description.title')}>
        <div className="mb-tiny bold">
          {t('activities.description.summaryHeader')}
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
              updateActivity(activity.id, { descShort: e.target.value })
            }
          />
        </div>

        <div className="mb3">
          <div className="mb-tiny bold">
            {t('activities.description.detailHeader')}
            <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
          </div>
          <Editor
            toolbar={EDITOR_CONFIG}
            editorState={descLong}
            onEditorStateChange={this.onEditorChange('descLong')}
            onBlur={this.syncEditorState('descLong')}
          />
        </div>

        <div className="mb3">
          <div className="mb-tiny bold">
            {t('activities.description.alternativesHeader')}
          </div>
          <Editor
            toolbar={EDITOR_CONFIG}
            editorState={altApproach}
            onEditorStateChange={this.onEditorChange('altApproach')}
            onBlur={this.syncEditorState('altApproach')}
          />
        </div>
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
