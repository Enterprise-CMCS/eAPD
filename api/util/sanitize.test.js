const tap = require('tap');
const sanitize = require('./sanitize');

tap.test('sanitize input', async sanitizeTests => {
  sanitizeTests.test('it should sanitize dangerous input', async test => {
    const dirty = '<a xlink:href="javascript:alert(document.domain)">XSS</a>';
    test.equals(
      sanitize(dirty),
      '<a>XSS</a>',
      'strips out dangerous characters'
    );
  });

  sanitizeTests.test('it should allow allowed characters', async test => {
    const dirty = '<h1>I am allowed</h1>';
    test.equals(sanitize(dirty), dirty, 'leaves characters that are allowed');
  });

  sanitizeTests.test('it should allow attributes for links', async test => {
    const dirty =
      '<p><a title="Google" href="http://google.com" target="_blank" rel="noopener">google.com</a></p>';
    test.equals(sanitize(dirty), dirty, 'allows link attributes');
  });

  sanitizeTests.test(
    'it should not allow some attributes for links',
    async test => {
      const dirty =
        '<a download hreflang media ping referrerpolicy type>link</a>';
      test.equals(
        sanitize(dirty),
        '<a>link</a>',
        'prevents unallowed link attributes'
      );
    }
  );
});
