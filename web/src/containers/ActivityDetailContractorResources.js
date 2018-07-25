import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import {
  addActivityContractor,
  removeActivityContractor,
  updateActivity as updateActivityAction
} from '../actions/activities';
import NoDataMsg from '../components/NoDataMsg';
import { Input, DollarInput, Textarea } from '../components/Inputs';
import { Subsection } from '../components/Section';
import Select from '../components/Select';
import { t } from '../i18n';
import { isProgamAdmin } from '../util';

const Label = props => (
  <h5 className="md-col-2 my-tiny pr1">{props.children}</h5>
);

Label.propTypes = {
  children: PropTypes.node.isRequired
};

const DOC_TYPES = ['Contract', 'RFP'];

class ContractorExpenses extends Component {
  state = { docType: DOC_TYPES[0] };

  updateDocType = e => {
    this.setState({ docType: e.target.value });
  };

  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { contractorResources: { [index]: { [field]: value } } };
    updateActivity(activity.key, updates);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = {
      contractorResources: { [index]: { years: { [year]: value } } }
    };
    updateActivity(activity.key, updates, true);
  };

  handleFileUpload = index => files => {
    if (!files.length) return;

    const { activity, updateActivity } = this.props;
    const { docType } = this.state;

    // only do one file at a time
    const { name, preview, size, type } = files[0];
    const newFile = { name, preview, size, type, category: docType };
    const existingFiles = activity.contractorResources[index].files || [];

    const updates = { [index]: { files: [...existingFiles, newFile] } };
    updateActivity(activity.key, { contractorResources: updates });

    // reset document category if necessary
    if (docType !== DOC_TYPES[0]) this.setState({ docType: DOC_TYPES[0] });
  };

  handleFileDelete = (cIdx, fIdx) => () => {
    const { activity, updateActivity } = this.props;
    const { files } = activity.contractorResources[cIdx];
    const updatedFiles = files.filter((_, i) => i !== fIdx);

    const updates = { [cIdx]: { files: updatedFiles } };
    updateActivity(activity.key, { contractorResources: updates });
  };

  render() {
    const { activity, years, addContractor, removeContractor } = this.props;
    const { docType } = this.state;

    if (!activity) return null;

    const { key: activityKey, contractorResources } = activity;

    return (
      <Subsection
        resource="activities.contractorResources"
        isKey={isProgamAdmin(activity)}
      >
        {contractorResources.length === 0 ? (
          <NoDataMsg>
            {t('activities.contractorResources.noDataNotice')}
          </NoDataMsg>
        ) : (
          <div className="mt3">
            {contractorResources.map((contractor, i) => (
              <div
                key={contractor.key}
                className="mb3 pb3 border-bottom border-grey"
              >
                <div className="mb3 md-flex">
                  <Label>
                    {t('activities.contractorResources.labels.contractorName')}
                  </Label>
                  <Input
                    name={`contractor-${contractor.key}-name`}
                    label={t('activities.contractorResources.srLabels.name')}
                    type="text"
                    value={contractor.name}
                    onChange={this.handleChange(i, 'name')}
                    wrapperClass="md-col-5"
                    hideLabel
                  />
                </div>
                <div className="mb3 md-flex">
                  <Label>
                    {t('activities.contractorResources.labels.description')}
                  </Label>
                  <Textarea
                    id={`contractor-${contractor.key}-desc`}
                    name={`contractor-${contractor.key}-desc`}
                    label={t(
                      'activities.contractorResources.srLabels.description'
                    )}
                    value={contractor.desc}
                    onChange={this.handleChange(i, 'desc')}
                    wrapperClass="md-col-8"
                    hideLabel
                  />
                </div>
                <div className="mb3 md-flex">
                  <Label>
                    {t('activities.contractorResources.labels.term')}
                  </Label>
                  <div className="md-col-6 flex">
                    <Input
                      type="date"
                      name={`contractor-${contractor.key}-start`}
                      label={t('activities.contractorResources.srLabels.start')}
                      value={contractor.start}
                      onChange={this.handleChange(i, 'start')}
                      wrapperClass="mr2 flex-auto"
                    />
                    <Input
                      type="date"
                      name={`contractor-${contractor.key}-end`}
                      label={t('activities.contractorResources.srLabels.end')}
                      value={contractor.end}
                      onChange={this.handleChange(i, 'end')}
                      wrapperClass="mr2 flex-auto"
                    />
                  </div>
                </div>
                <div className="mb3 md-flex">
                  <Label>
                    {t('activities.contractorResources.labels.attachments')}
                  </Label>
                  <div className="md-col-9 md-flex items-start">
                    <div className="md-col-6 flex items-end mr2">
                      <Select
                        name={`${contractor.key}-attachment-type`}
                        options={DOC_TYPES}
                        label="Document Type"
                        wrapperClass="col-6 mr2"
                        value={docType}
                        onChange={this.updateDocType}
                      />
                      <Dropzone
                        className="btn btn-primary"
                        onDrop={this.handleFileUpload(i)}
                      >
                        Select file
                      </Dropzone>
                    </div>
                    {(contractor.files || []).length > 0 && (
                      <div className="md-col-4">
                        <h5 className="md-mt0 mb-tiny">Attached files</h5>
                        {contractor.files.map((f, j) => (
                          <div key={`${f.name}-${j}`} className="mb1">
                            <div>
                              <button
                                type="button"
                                className="btn btn-outline border-silver px-tiny py0 right"
                                onClick={this.handleFileDelete(i, j)}
                              >
                                ✗
                              </button>
                              <a
                                className="block bold truncate"
                                href={f.preview}
                                target="_blank"
                              >
                                {f.name}
                              </a>
                            </div>
                            <div className="h6">({f.category})</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb3 md-flex">
                  <Label>
                    {t('activities.contractorResources.labels.cost')}
                  </Label>
                  <div className="md-col-6 flex">
                    {years.map(year => (
                      <DollarInput
                        key={year}
                        name={`contractor-${contractor.key}-cost-${year}`}
                        label={year}
                        value={contractor.years[year]}
                        onChange={this.handleYearChange(i, year)}
                        wrapperClass="mr2 flex-auto"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline border-black px1 py-tiny mt-tiny h5"
                    onClick={() =>
                      removeContractor(activityKey, contractor.key)
                    }
                  >
                    {t('activities.contractorResources.removeLabel')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addContractor(activityKey)}
        >
          {t('activities.contractorResources.addContractorButtonText')}
        </button>
      </Subsection>
    );
  }
}

ContractorExpenses.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activity: byKey[aKey],
  years: apd.data.years
});

export const mapDispatchToProps = {
  addContractor: addActivityContractor,
  removeContractor: removeActivityContractor,
  updateActivity: updateActivityAction
};

export { ContractorExpenses as raw };

export default connect(mapStateToProps, mapDispatchToProps)(ContractorExpenses);
