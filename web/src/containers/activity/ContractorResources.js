import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import {
  addActivityContractor,
  deleteActivityContractorFile,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity as updateActivityAction,
  uploadActivityContractorFile
} from '../../actions/activities';
import Btn from '../../components/Btn';
import CollapsibleList from '../../components/CollapsibleList';
import DateRangePicker from '../../components/DateRangePicker';
import DeleteButton from '../../components/DeleteConfirm';
import { Input, DollarInput, Textarea } from '../../components/Inputs';
import Label from '../../components/Label';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import Select from '../../components/Select';
import { t } from '../../i18n';
import { formatMoney } from '../../util/formats';

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
      <DateRangePicker
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
                    rel="noopener noreferrer"
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
      <Label>{t('activities.contractorResources.labels.totalCost')}</Label>
      <div className="md-col-6 flex">
        <DollarInput
          name={`contractor-${contractor.key}-totalCost`}
          label={t('activities.contractorResources.labels.totalCostInput')}
          value={contractor.totalCost}
          onChange={handleChange(idx, 'totalCost')}
          wrapperClass="mr2 flex-auto"
        />
      </div>
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.contractorResources.labels.cost')}</Label>
      <div className="md-col-6 flex">
        {years.map(year => (
          <DollarInput
            key={year}
            name={`contractor-${contractor.key}-cost-${year}`}
            label={t('activities.contractorResources.labels.costInput', {
              year
            })}
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
  constructor(props) {
    super(props);

    this.state = {
      docType: DOC_TYPES[0]
    };
  }

  getDeleter = entryKey => () => {
    const { activityKey, removeContractor } = this.props;
    removeContractor(activityKey, entryKey);
  };

  handleAdd = () => {
    const { activityKey, addContractor } = this.props;
    addContractor(activityKey);
  };

  handleChange = (index, field) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = { contractorResources: { [index]: { [field]: value } } };
    updateActivity(activityKey, updates);
  };

  handleDelete = contractor => this.getDeleter(contractor.key)();

  handleDocChange = e => {
    this.setState({ docType: e.target.value });
  };

  handleFileDelete = (cIdx, fIdx) => () => {
    const { activityKey, deleteFile } = this.props;

    deleteFile(activityKey, cIdx, fIdx);
  };

  handleFileUpload = index => files => {
    if (!files.length) return;

    const { activityKey, uploadFile } = this.props;
    const { docType } = this.state;
    uploadFile(activityKey, index, docType, files[0]);
  };

  handleHourlyChange = (index, year, field) => e => {
    const value = +e.target.value;

    const { activityKey, contractors, updateActivity } = this.props;
    const { data: hourlyData } = contractors[index].hourly;

    const otherField = field === 'hours' ? 'rate' : 'hours';
    const otherVal = hourlyData[year][otherField];
    const totalCost = (value || 0) * (otherVal || 0);

    const newData = {
      years: { [year]: totalCost },
      hourly: { data: { [year]: { [field]: value } } }
    };

    const updates = { contractorResources: { [index]: newData } };
    updateActivity(activityKey, updates, true);
  };

  handleTermChange = index => ({ start, end }) => {
    const { activityKey, updateActivity } = this.props;
    const dates = { start, end };

    const updates = { contractorResources: { [index]: dates } };
    updateActivity(activityKey, updates);
  };

  handleUseHourly = (contractor, useHourly) => () => {
    const { activityKey, toggleContractorHourly } = this.props;
    toggleContractorHourly(activityKey, contractor.key, useHourly);
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const updates = {
      contractorResources: { [index]: { years: { [year]: value } } }
    };
    updateActivity(activityKey, updates, true);
  };

  render() {
    const { contractors, years } = this.props;
    const { docType } = this.state;

    if (!contractors) return null;

    return (
      <Subsection resource="activities.contractorResources" nested>
        {contractors.length === 0 ? (
          <NoDataMsg>
            {t('activities.contractorResources.noDataNotice')}
          </NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            <CollapsibleList
              items={contractors}
              getKey={contractor => contractor.key}
              deleteItem={this.handleDelete}
              header={(contractor, i) => (
                <Fragment>
                  <div className="col-3 truncate">
                    {i + 1}. <strong>{contractor.name || 'Name'}</strong>
                  </div>
                  {years.map(year => (
                    <div key={year} className="col-3 truncate">
                      {year}:{' '}
                      <span className="bold mono">
                        {formatMoney(contractor.years[year])}
                      </span>
                    </div>
                  ))}
                </Fragment>
              )}
              content={(contractor, i) => (
                <ContractorForm
                  key={contractor.key}
                  idx={i}
                  contractor={contractor}
                  docType={docType}
                  years={years}
                  handleChange={this.handleChange}
                  handleDelete={this.getDeleter(contractor.key)}
                  handleDocChange={this.handleDocChange}
                  handleFileDelete={this.handleFileDelete}
                  handleFileUpload={this.handleFileUpload}
                  handleHourlyChange={this.handleHourlyChange}
                  handleTermChange={this.handleTermChange}
                  handleUseHourly={this.handleUseHourly}
                  handleYearChange={this.handleYearChange}
                />
              )}
            />
          </div>
        )}
        <Btn onClick={this.handleAdd}>
          {t('activities.contractorResources.addContractorButtonText')}
        </Btn>
      </Subsection>
    );
  }
}

ContractorResources.propTypes = {
  activityKey: PropTypes.string.isRequired,
  contractors: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  addContractor: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  removeContractor: PropTypes.func.isRequired,
  toggleContractorHourly: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activityKey: aKey,
  contractors: byKey[aKey].contractorResources,
  years: apd.data.years
});

export const mapDispatchToProps = {
  addContractor: addActivityContractor,
  deleteFile: deleteActivityContractorFile,
  removeContractor: removeActivityContractor,
  toggleContractorHourly: toggleActivityContractorHourly,
  updateActivity: updateActivityAction,
  uploadFile: uploadActivityContractorFile
};

export { ContractorResources as ContractorResourcesRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorResources);
