import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectApd } from '../actions/app'
import { selectApdData } from '../reducers/apd.selectors';
import { getAPDYearRange } from '../reducers/apd';
import { getUserStateOrTerritory } from '../reducers/user.selector';

class ApdPrintView extends Component {
    constructor(props) {
        super(props);
        this.props.selectApd(5, '/print');
    }

    EssaySection = () => {
        return (
            <div>words</div>
        );
    }

    render() {
        const {
            place,
            year
        } = this.props;

        if(!this.props.apd) {
            return null;
        }
        


        return(
            <div className="site-body ds-l-container">
                <h1 id="start-main-content" className="ds-h1 apd--title">
                    <span className="ds-h6 ds-u-display--block">{this.props.apd.name}</span>
                    {place.name} {year} APD
                </h1>

            </div>
        )
    }
};

const mapStateToProps = state => ({
    apd: selectApdData(state),
    place: getUserStateOrTerritory(state),
    year: getAPDYearRange(state)
})

const mapDispatchToProps = { selectApd };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApdPrintView);