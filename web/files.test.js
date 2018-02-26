// The purpose of this file is to ensure all relevant
// source files are imported so we get accurate
// coverage metrics. Without that, we only get
// coverage metric of sources that are imported
// during tests, which means we could easily forget
// to write tests for a new file and our automated
// tools wouldn't warn us.

import './src/actions';

import './src/components/App';
import './src/components/Counter';
import './src/components/Root';

import './src/containers/Home';

import './src/reducers';
import './src/reducers/counter';
