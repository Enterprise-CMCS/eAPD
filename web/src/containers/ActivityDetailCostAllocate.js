import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input } from '../components/Inputs2';
import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../util/editor';

class ActivityDetailCostAllocate extends Component {
  constructor(props) {
    super(props);

    const { costAllocateDesc, otherFundingDesc } = props.activity;

    this.state = {
      costAllocateDesc: htmlToEditor(costAllocateDesc),
      otherFundingDesc: htmlToEditor(otherFundingDesc)
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
    const { costAllocateDesc, otherFundingDesc } = this.state;

    return (
      <Collapsible title="Cost Allocation and Other Funding Sources" open>
        <div className="mb3">
          <div className="mb-tiny bold">Cost allocation methodology</div>
          <Editor
            toolbar={EDITOR_CONFIG}
            editorState={costAllocateDesc}
            onEditorStateChange={this.onEditorChange('costAllocateDesc')}
            onBlur={this.syncEditorState('costAllocateDesc')}
          />
        </div>

        <div className="mb3">
          <div className="mb-tiny bold">Other funding description</div>
          <Editor
            toolbar={EDITOR_CONFIG}
            editorState={otherFundingDesc}
            onEditorStateChange={this.onEditorChange('otherFundingDesc')}
            onBlur={this.syncEditorState('otherFundingDesc')}
          />
        </div>

        <Input
          name="other-funding-amt"
          label="Other funding amount"
          wrapperClass="mb2 sm-col-4"
          value={activity.otherFundingAmt}
          onChange={e =>
            updateActivity(activity.id, { otherFundingAmt: e.target.value })
          }
        />
      </Collapsible>
    );
  }
}

ActivityDetailCostAllocate.propTypes = {
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
  ActivityDetailCostAllocate
);
