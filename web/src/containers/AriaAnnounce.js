import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAriaAnnouncement } from '../reducers/aria';

const AriaAnnounce = (props) =>{
    // const [ariaMessage, getAriaAnnouncement] = useState(null);
    const {ariaMessage} = props;
    return (
        <div
            role="region"
            aria-live="polite"
        >
            {ariaMessage}
        </div>
    )
};

const mapStateToProps = state => ({
    ariaMessage: getAriaAnnouncement(state)
});

export default connect(
    mapStateToProps
)(AriaAnnounce);