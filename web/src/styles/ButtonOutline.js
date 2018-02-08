import styled from 'styled-components';
import { ButtonOutline, util } from 'rebass';

const { color, darken } = util;

// The original Rebass ButtonOutline improperly
// sets background color to "blue" no matter the color
// of the outline (on hover and active states).
// This fixes that and is now dynamic based on "color" prop
const ButtonOutlineNew = styled(ButtonOutline)`
  ${props => {
    const hex = color(props)(props.color);

    return `
      &:hover {
        background-color: ${hex};
      }

      &:active {
        background-color: ${hex};
        box-shadow: inset 0 0 0 2px ${hex}, inset 0 0 8px ${darken(1 / 4)};
      }
    `;
  }};
`;

export default ButtonOutlineNew;
