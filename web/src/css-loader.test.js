const pkg = require('../package.json');

// This test can be deleted entirely when the issue is fixed and the library
// can safely be upgraded.

describe('make sure css-loader is fixed before updating', () => {
  it('We cannot update css-loader until this issue is fixed: https://github.com/webpack-contrib/css-loader/issues/1039', () => {
    expect(pkg.devDependencies['css-loader']).toEqual('3.2.1');
  });
});
