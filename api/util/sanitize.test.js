import tap from 'tap';
import sanitize from './sanitize';

tap.test('sanitize input', async sanitizeTests => {
  sanitizeTests.test('it should sanitize dangerous input', async test => {
    const dirty = '<a xlink:href="javascript:alert(document.domain)">XSS</a>';
    test.equal(
      sanitize(dirty),
      '<a>XSS</a>',
      'strips out dangerous characters'
    );
  });

  sanitizeTests.test('it should allow allowed characters', async test => {
    const dirty = '<h1>I am allowed</h1>';
    test.equal(sanitize(dirty), dirty, 'leaves characters that are allowed');
  });

  sanitizeTests.test('it should allow attributes for links', async test => {
    const dirty =
      '<p><a title="Google" href="http://google.com" target="_blank" rel="noopener">google.com</a></p>';
    test.equal(sanitize(dirty), dirty, 'allows link attributes');
  });

  sanitizeTests.test('it should allow style for spans', async test => {
    const dirty =
      '<span style="color:#3598db;text-decoration:line-through">styling</span>';
    test.equal(sanitize(dirty), dirty, 'allows style attributes');
  });

  sanitizeTests.test('it should allow style for p', async test => {
    const dirty = '<p style="padding-left:200px">big indent</p>';
    test.equal(sanitize(dirty), dirty, 'allows style attributes');
  });

  sanitizeTests.test('it should allow different types of list', async test => {
    const dirty =
      '<ol style="list-style-type:upper-roman"><li>First<ol style="list-style-type:upper-alpha"><li>Second<ol style="list-style-type:lower-roman"><li>Third<ol style="list-style-type:lower-alpha"><li>Fourth<ol><li>Fifth<ol style="list-style-type:lower-greek"><li>Sixth<ul><li>Seventh<ul style="list-style-type:circle"><li>Eighth</li></ul></li></ul></li></ol></li></ol></li></ol></li></ol></li></ol></li></ol>';
    test.equal(sanitize(dirty), dirty, 'allows list type attributes');
  });

  sanitizeTests.test(
    'it should not allow some attributes for links',
    async test => {
      const dirty =
        '<a download hreflang media ping referrerpolicy type>link</a>';
      test.equal(
        sanitize(dirty),
        '<a>link</a>',
        'prevents unallowed link attributes'
      );
    }
  );
});
