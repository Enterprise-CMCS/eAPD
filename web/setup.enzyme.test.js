import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

window.matchMedia = () => ({
  matches: ''
});

window.scroll = () => {};
