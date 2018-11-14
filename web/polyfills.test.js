// React 16 requires that this be defined, but
// enzyme currently doesn't provide it.  So,
// we'll just polyfill in a dummy for ourselves
// until enzyme supports it.  This is the precise
// polyfill implementaiton that React suggests.
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = callback => {
  setTimeout(callback, 0);
};
