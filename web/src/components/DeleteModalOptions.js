import React from 'react';

export default function getDeleteModalOptions(objType) {
  const bodyOptions = {
    APD: {
      body: () => {
        return (
          <React.Fragment>
            <div>
              You are about to permanently delete all the information within
              this {objType}. This action cannot be undone.
            </div>
            <br />
            <div>Do you want to delete this APD?</div>
          </React.Fragment>
        );
      },
      buttonText: 'Delete APD'
    },
    Activity: {
      body: () => {
        return (
          <React.Fragment>
            <div>
              Deleting this activity will remove all related information entered
              to this point. This action cannot be undone.
            </div>
            <br />
            <div>Do you want to delete this activity?</div>
          </React.Fragment>
        );
      },
      buttonText: 'Delete Activity'
    },
    'Private Contractor': {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this contractor resource and all
            their related information? This action cannot be undone.
          </div>
        );
      }
    },
    Milestone: {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this milestone and all related
            information? This action cannot be undone.
          </div>
        );
      }
    },
    'Key Personnel': {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this key person and all their
            related information? This action cannot be undone.
          </div>
        );
      }
    },
    'Other State Expense': {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this other state expense and all
            related information? This action cannot be undone.
          </div>
        );
      }
    },
    'Outcome and Metrics': {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this outcome and the corresponding
            metric(s)? This action cannot be undone.
          </div>
        );
      }
    },
    FFY: {
      body: () => {
        return (
          <React.Fragment>
            <div>
              Unchecking this Federal Fiscal Year (FFY) will permanently delete
              any FFY specific data in the current APD. This action cannot be
              undone.
            </div>
            <br />
            <div>Are you sure you want to delete this FFY?</div>
          </React.Fragment>
        );
      },
      buttonText: 'Delete FFY'
    },
    Metric: {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this metric? This action cannot be
            undone.
          </div>
        );
      }
    },
    'State Staff Expenses': {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this state staff expense and related
            state staff expense information? This action cannot be undone.
          </div>
        );
      }
    },
    Certification: {
      body: () => {
        return (
          <div>
            Are you sure you want to delete this certification? This action
            cannot be undone.
          </div>
        );
      }
    },
    'Funding Source': {
      body: () => {
        return <div>PLACEHOLDER TEXT FOR FUNDING SOURCE</div>;
      }
    }
  };

  return bodyOptions[objType];
}
