import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectApd } from '../actions/app'
import { selectApdData } from '../reducers/apd.selectors';
import { selectBudget } from '../reducers/budget.selectors.js';
import { getAPDYearRange } from '../reducers/apd';
import { getUserStateOrTerritory } from '../reducers/user.selector';
import ApdStateProfile from '../components/ApdStateProfilePrint';
import ApdSummary from '../containers/ApdSummaryPrint';
import PreviousActivities from '../containers/PreviousActivitiesPrint';

class ApdPrintView extends Component {
    constructor(props) {
        super(props);
        this.props.selectApd(5, '/print');
    }

    render() {
        const {
            place,
            year
        } = this.props;

        if(!Object.keys(this.props.apd).length) {
            return null;
        }

       
        return (
            <div className="site-body ds-l-container">
                <h1 id="start-main-content" className="ds-h1 apd--title">
                    <span className="ds-h6 ds-u-display--block">{this.props.apd.name}</span>
                    {place.name} {year} APD
                </h1>
                <ApdStateProfile 
                    stateProfile={this.props.apd.stateProfile}
                    keyPersonnel={this.props.apd.keyPersonnel}
                />
                <ApdSummary />    
                <PreviousActivities />

                <h2>Activities</h2>
                <h3>Activitiy List</h3>
                <h2>Activity Schedule Summary</h2>
                <h2>Proposed Budget</h2>
                <h3>Summary Budget Table</h3>
                <h3>Quarterly Federal Share</h3>
                <h3>Estimated Quarterly Incentive Payment</h3>
                <h2>Assurances and Compliance</h2>
                <h2>Executive Summary</h2>
                <h3>Activities Summary</h3>
                <h3>Program Budget Tables</h3>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    apd: selectApdData(state),
    budget: selectBudget(state),
    place: getUserStateOrTerritory(state),
    year: getAPDYearRange(state)
})

const mapDispatchToProps = { selectApd };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApdPrintView);