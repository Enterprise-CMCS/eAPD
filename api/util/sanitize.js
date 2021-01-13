const sanitizeHtml = require('sanitize-html');

const sanitize = dirty => {
  if (typeof dirty === 'string' || dirty instanceof String) {
    return sanitizeHtml(dirty, {
      allowedAttributes: {
        a: ['href', 'name', 'target', 'title', 'rel'],
        // We don't currently allow img itself by default, but this
        // would make sense if we did. You could add srcset here,
        // and if you do the URL is checked for safety
        img: ['src']
      }
    });
  }
  return dirty;
};

module.exports = sanitize;
