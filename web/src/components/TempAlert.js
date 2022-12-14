import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert, Button } from '@cmsgov/design-system';

import { getTempMessages } from '../redux/reducers/errors';

const TempAlert = props => {
  const { tempMessages } = props;

  if (!tempMessages) {
    return null;
  }

  const [tempMsgState, setTempMsgState] = useState(tempMessages);

  const removeMsg = i => {
    setTempMsgState([
      ...tempMsgState.slice(0, i),
      ...tempMsgState.slice(i + 1)
    ]);
  };

  return (
    <div>
      {tempMsgState.map((value, index) => (
        <Alert key={`tempMsg-${index + 1}`} variation={value.variation}>
          <div className="tempMessage">
            <div>{value.message}</div>
            <div>
              <Button onClick={() => removeMsg(index)} variation="ghost">
                X
              </Button>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );

  // let messages = [];

  // function removeMsg (index) {
  //   console.log('Before: ' + tempMessages);
  //   tempMessages.splice(index, 1);
  //   console.log('After: ' + tempMessages);
  //   setMessages(tempMessages);
  // }

  // function setMessages (messageList) {
  //   if (messageList.length > 0) {
  //     messageList.forEach((value, i) => {
  //       messages.push(
  //         <Alert variation={value.variation}>
  //           <div className="tempMessage">
  //             <div>
  //               {value.message}
  //             </div>
  //             <div>
  //               <Button
  //                 onClick={() => removeMsg(i)}
  //                 variation="ghost"
  //               >
  //                 X
  //               </Button>
  //             </div>
  //           </div>
  //         </Alert>
  //       );
  //     });
  //   }
  // }

  // if (tempMessages.length > 0) {
  //   setMessages(tempMessages);

  //   return (
  //     <div className="ds-u-margin-y--3">
  //       {messages}
  //     </div>
  //   );
  // }

  // return null;
};

TempAlert.propTypes = {
  tempMessages: PropTypes.array
};

TempAlert.defaultProps = {
  tempMessages: []
};

const mapStateToProps = state => ({
  tempMessages: getTempMessages(state)
});

export default connect(mapStateToProps)(TempAlert);

export { TempAlert as plain };
