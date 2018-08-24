import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import {
  addActivityContractor,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import DatePickerWrapper from '../../components/DatePickerWrapper';
import DeleteButton from '../../components/DeleteConfirm';
import { Input, DollarInput, Textarea } from '../../components/Inputs';
import Label from '../../components/Label';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import Select from '../../components/Select';
import { t } from '../../i18n';

const DOC_TYPES = ['Contract', 'Contract Amendment', 'RFP'];

const ContractorForm = ({
  idx,
  contractor,
  docType,
  years,
  handleChange,
  handleDelete,
  handleDocChange,
  handleFileDelete,
  handleFileUpload,
  handleHourlyChange,
  handleTermChange,
  handleUseHourly,
  handleYearChange
}) => (
  <div className="mt2 mb3">
    <Btn
      kind="outline"
      extraCss="right px-tiny py0 h5 xs-hide"
      onClick={handleDelete}
    >
      ✗
    </Btn>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.contractorName')}</Label>
      <Input
        name={`contractor-${contractor.key}-name`}
        label={t('activities.contractorResources.srLabels.name')}
        type="text"
        value={contractor.name}
        onChange={handleChange(idx, 'name')}
        wrapperClass="md-col-5"
        hideLabel
      />
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.description')}</Label>
      <Textarea
        id={`contractor-${contractor.key}-desc`}
        name={`contractor-${contractor.key}-desc`}
        label={t('activities.contractorResources.srLabels.description')}
        value={contractor.desc}
        onChange={handleChange(idx, 'desc')}
        wrapperClass="md-col-8"
        hideLabel
      />
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.term')}</Label>
      <DatePickerWrapper
        startDateId={`contractor-${contractor.key}-start`}
        endDateId={`contractor-${contractor.key}-end`}
        initialStartDate={contractor.start}
        initialEndDate={contractor.end}
        onChange={handleTermChange(idx)}
        numberOfMonths={2}
        daySize={32}
      />
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.attachments')}</Label>
      <div className="md-col-9 md-flex items-start">
        <div className="md-col-6 flex items-end mr2">
          <Select
            name={`${contractor.key}-attachment-type`}
            options={DOC_TYPES}
            label="Document Type"
            wrapperClass="col-6 mr2"
            value={docType}
            onChange={handleDocChange}
          />
          <Dropzone
            className="btn btn-primary btn-dropzone"
            onDrop={handleFileUpload(idx)}
            multiple={false}
            inputProps={{
              title: 'select a file to attach for this contractor'
            }}
          >
            Select file
          </Dropzone>
        </div>
        {(contractor.files || []).length > 0 && (
          <div className="md-col-4">
            <h5 className="md-mt0 mb-tiny">Attached files</h5>
            {contractor.files.map((file, fileIdx) => (
              <div key={`${file.name}-${fileIdx}`} className="mb1">
                <div>
                  <DeleteButton
                    kind="outline"
                    extraCss="px-tiny py0 right"
                    remove={handleFileDelete(idx, fileIdx)}
                    resource="activities.contractorResources.delete"
                  />
                  <a
                    className="block bold truncate"
                    href={file.preview}
                    target="_blank"
                  >
                    {file.name}
                  </a>
                </div>
                <div className="h6">({file.category})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.cost')}</Label>
      <div className="md-col-6 flex">
        {years.map(year => (
          <DollarInput
            key={year}
            name={`contractor-${contractor.key}-cost-${year}`}
            label={year}
            value={contractor.years[year]}
            onChange={handleYearChange(idx, year)}
            disabled={contractor.hourly.useHourly}
            wrapperClass="mr2 flex-auto"
          />
        ))}
      </div>
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.hourly')}</Label>
      <div className="md-col-6">
        <div className="flex items-center">
          <div className="mr2">This is an hourly resource</div>
          <div>
            <Btn
              kind="outline"
              extraCss={contractor.hourly.useHourly ? 'bg-black white' : ''}
              onClick={handleUseHourly(contractor, true)}
              disabled={contractor.hourly.useHourly}
            >
              Yes
            </Btn>{' '}
            <Btn
              kind="outline"
              extraCss={contractor.hourly.useHourly ? '' : 'bg-black white'}
              onClick={handleUseHourly(contractor, false)}
              disabled={!contractor.hourly.useHourly}
            >
              No
            </Btn>
          </div>
        </div>
        {contractor.hourly.useHourly && (
          <div className="mt3">
            {years.map(year => (
              <div key={year} className="mb2 flex items-center justify-between">
                <div className="col-3 bold">FFY {year}</div>
                <Input
                  name={`c-${contractor.key}-${year}-hrs`}
                  label="Number of hours"
                  wrapperClass="col-4"
                  className="m0 input mono"
                  type="number"
                  value={contractor.hourly.data[year].hours}
                  onChange={handleHourlyChange(idx, year, 'hours')}
                />
                <DollarInput
                  name={`c-${contractor.key}-${year}-rate`}
                  label="Hourly rate"
                  wrapperClass="col-4"
                  value={contractor.hourly.data[year].rate}
                  onChange={handleHourlyChange(idx, year, 'rate')}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

ContractorForm.propTypes = {
  idx: PropTypes.number.isRequired,
  contractor: PropTypes.object.isRequired,
  docType: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleDocChange: PropTypes.func.isRequired,
  handleFileDelete: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleHourlyChange: PropTypes.func.isRequired,
  handleTermChange: PropTypes.func.isRequired,
  handleUseHourly: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired
};

class ContractorResources extends Component {
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

  handleTermChange = index => ({ start, end }) => {
    const { activity, updateActivity } = this.props;
    const dates = { start, end };

    const updates = { contractorResources: { [index]: dates } };
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

  handleUseHourly = (contractor, useHourly) => () => {
    const { activity, toggleContractorHourly } = this.props;
    toggleContractorHourly(activity.key, contractor.key, useHourly);
  };

  handleHourlyChange = (index, year, field) => e => {
    const value = +e.target.value;

    const { activity, updateActivity } = this.props;
    const { data: hourlyData } = activity.contractorResources[index].hourly;

    const otherField = field === 'hours' ? 'rate' : 'hours';
    const otherVal = hourlyData[year][otherField];
    const totalCost = (value || 0) * (otherVal || 0);

    const newData = {
      years: { [year]: totalCost },
      hourly: { data: { [year]: { [field]: value } } }
    };

    const updates = { contractorResources: { [index]: newData } };
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

  handleDelete = entryKey => () => {
    const { activity, removeContractor } = this.props;
    removeContractor(activity.key, entryKey);
  };

  render() {
    const { activity, years, addContractor } = this.props;
    const { docType } = this.state;

    if (!activity) return null;

    const { key: activityKey, contractorResources } = activity;

    return (
      <Subsection resource="activities.contractorResources" nested>
        {contractorResources.length === 0 ? (
          <NoDataMsg>
            {t('activities.contractorResources.noDataNotice')}
          </NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            {contractorResources.map((contractor, i) => (
              <ContractorForm
                key={contractor.key}
                idx={i}
                contractor={contractor}
                docType={docType}
                years={years}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                handleDocChange={this.updateDocType}
                handleFileUpload={this.handleFileUpload}
                handleFileDelete={this.handleFileDelete}
                handleHourlyChange={this.handleHourlyChange}
                handleTermChange={this.handleTermChange}
                handleUseHourly={this.handleUseHourly}
                handleYearChange={this.handleYearChange}
              />
            ))}
          </div>
        )}
        <Btn onClick={() => addContractor(activityKey)}>
          {t('activities.contractorResources.addContractorButtonText')}
        </Btn>
      </Subsection>
    );
  }
}

ContractorResources.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  toggleContractorHourly: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activity: byKey[aKey],
  years: apd.data.years
});

export const mapDispatchToProps = {
  addContractor: addActivityContractor,
  removeContractor: removeActivityContractor,
  toggleContractorHourly: toggleActivityContractorHourly,
  updateActivity: updateActivityAction
};

export { ContractorResources as ContractorResourcesRaw };
export default connect(mapStateToProps, mapDispatchToProps)(
  ContractorResources
);
