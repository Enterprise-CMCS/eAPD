// import React from 'react';
// import { renderWithConnection, screen } from 'apd-testing-library';

// import TempAlert from './TempAlert';

// const setup = (props = {}, options = {}) => {
//   console.log(props)
//   return renderWithConnection(<TempAlert {...props} />, options);
// };

// describe('<TempAlert />', () => {
//   it('displays apd success message', () => {
//     let msg = 'Test message.';

//     setup({tempMessages: [{
//       message: msg,
//       variation: 'success'
//     }]})

//     console.log(screen)

//     expect(screen.getByText(msg)).toBeTruthy();
//   });
// });
