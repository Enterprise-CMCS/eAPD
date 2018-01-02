import { Component } from 'react';

class DevTools extends Component {
  componentDidMount() {
    this.addTota11y();
  }

  addTota11y = () => {
    const script = document.createElement('script');
    script.src = '_dev/tota11y.min.js';
    document.body.appendChild(script);
  };

  render() {
    return null;
  }
}

export default DevTools;
