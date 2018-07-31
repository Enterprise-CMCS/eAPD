/*

This is forked from https://github.com/GA-MO/react-confirm-alert
It alleviates some out-of-date dependencies and fixes a bug around
the application of the "react-confirm-alert-blur" class

*/

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Btn from './Btn';

function getAppWrapper() {
  const bodyKids = [...document.body.children];
  return bodyKids.filter(el => el.nodeName === 'DIV')[0] || bodyKids[0];
}

function createSVGBlurReconfirm() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '0.7');

  const filter = document.createElementNS(svgNS, 'filter');
  filter.setAttribute('id', 'gaussian-blur');
  filter.appendChild(feGaussianBlur);

  const svgElem = document.createElementNS(svgNS, 'svg');
  svgElem.setAttribute('id', 'react-confirm-alert-firm-svg');
  svgElem.setAttribute('class', 'react-confirm-alert-svg');
  svgElem.appendChild(filter);

  document.body.appendChild(svgElem);
}

function removeSVGBlurReconfirm() {
  const svg = document.getElementById('react-confirm-alert-firm-svg');
  svg.parentNode.removeChild(svg);

  const appWrapper = getAppWrapper();
  appWrapper.classList.remove('react-confirm-alert-blur');
}

function createElementReconfirm(props) {
  const appWrapper = getAppWrapper();
  appWrapper.classList.add('react-confirm-alert-blur');

  const divTarget = document.createElement('div');
  divTarget.id = 'react-confirm-alert';
  document.body.appendChild(divTarget);

  render(<ConfirmAlert {...props} />, divTarget);
}

function removeElementReconfirm() {
  const target = document.getElementById('react-confirm-alert');
  unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
}

export function confirmAlert(props) {
  createSVGBlurReconfirm();
  createElementReconfirm(props);
}

class ConfirmAlert extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.array,
    customUI: PropTypes.func,
    childrenElement: PropTypes.func,
    willUnmount: PropTypes.func
  };

  static defaultProps = {
    title: 'Please confirm',
    message: '',
    buttons: [
      {
        label: 'Cancel',
        onClick: () => null
      },
      {
        label: 'Confirm',
        onClick: () => null
      }
    ],
    customUI: null,
    childrenElement: () => null,
    willUnmount: () => null
  };

  componentWillUnmount = () => {
    this.props.willUnmount();
  };

  handleClickButton = button => {
    if (button.onClick) button.onClick();
    this.close();
  };

  close = () => {
    removeElementReconfirm();
    removeSVGBlurReconfirm();
  };

  renderCustomUI = () => {
    const { title, message, customUI } = this.props;
    const dataCustomUI = {
      title,
      message,
      onClose: this.close
    };

    return customUI(dataCustomUI);
  };

  render() {
    const { title, message, buttons, childrenElement, customUI } = this.props;

    return (
      <div className="react-confirm-alert-overlay">
        <div className="react-confirm-alert">
          {customUI ? (
            this.renderCustomUI()
          ) : (
            <div className="react-confirm-alert-body">
              {title && <h1 className="mt0">{title}</h1>}
              {message}
              {childrenElement()}
              <div className="react-confirm-alert-button-group">
                {buttons.map((button, i) => (
                  <Btn
                    key={i}
                    size="small"
                    extraCss="mr1"
                    onClick={() => this.handleClickButton(button)}
                  >
                    {button.label}
                  </Btn>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ConfirmAlert;
