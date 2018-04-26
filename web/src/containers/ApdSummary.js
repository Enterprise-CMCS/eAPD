import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateApd as updateApdAction } from '../actions/apd';
import Collapsible from '../components/Collapsible';
import { Textarea } from '../components/Inputs';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { EDITOR_CONFIG, htmlToEditor, editorToHtml } from '../util/editor';

const YEAR_OPTIONS = ['2018', '2019', '2020'];

class ApdSummary extends Component {
  constructor(props) {
    super(props);

    const { overview } = props.apd;

    this.state = {
      overview: htmlToEditor(overview)
    };
  }

  onEditorChange = name => editorState => {
    this.setState({ [name]: editorState });
  };

  syncEditorState = name => () => {
    const html = editorToHtml(this.state[name]);
    const { updateApd } = this.props;

    updateApd({ [name]: html });
  };

  handleYears = e => {
    const { value } = e.target;
    const { apd, updateApd } = this.props;
    const { years } = apd;

    const yearsNew = years.includes(value)
      ? years.filter(y => y !== value)
      : [...years, value].sort();

    updateApd({ years: yearsNew });
  };

  render() {
    const { apd, updateApd } = this.props;
    const { overview } = this.state;

    return (
      <Section>
        <SectionTitle>{t('apd.sectionTitle')}</SectionTitle>
        <Collapsible title={t('apd.overview.title')}>
          <div className="mb3">
            <div className="mb-tiny bold">{t('apd.overview.yearsCovered')}</div>
            {YEAR_OPTIONS.map(option => (
              <label key={option} className="mr1">
                <input
                  type="checkbox"
                  value={option}
                  checked={apd.years.includes(option)}
                  onChange={this.handleYears}
                />
                {option}
              </label>
            ))}
          </div>
          <div>
            <div className="mb-tiny bold">{t('apd.overview.labels.desc')}</div>
            <Editor
              toolbar={EDITOR_CONFIG}
              editorState={overview}
              onEditorStateChange={this.onEditorChange('overview')}
              onBlur={this.syncEditorState('overview')}
            />
          </div>
        </Collapsible>
        <Collapsible title={t('apd.hit')} open>
          <Textarea
            name="hit-narrative"
            label={t('apd.hit')}
            rows="5"
            value={apd.hitNarrative}
            onChange={e => updateApd({ hitNarrative: e.target.value })}
          />
        </Collapsible>
        <Collapsible title={t('apd.hie')}>
          <Textarea
            name="hie-narrative"
            label={t('apd.hie')}
            rows="5"
            value={apd.hieNarrative}
            onChange={e => updateApd({ hieNarrative: e.target.value })}
          />
        </Collapsible>
        <Collapsible title={t('apd.mmis')}>
          <Textarea
            name="mmis-narrative"
            label={t('apd.mmis')}
            rows="5"
            value={apd.mmisNarrative}
            onChange={e => updateApd({ mmisNarrative: e.target.value })}
          />
        </Collapsible>
      </Section>
    );
  }
}

ApdSummary.propTypes = {
  apd: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data } }) => ({ apd: data });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(ApdSummary);
