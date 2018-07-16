import sinon from 'sinon';

const load = () => {
  jest.resetModules();
  return require('./index'); // eslint-disable-line global-require
};

describe('utility arrays', () => {
  test('constant shared arrays are as expected', () => {
    const { ACTIVITY_FUNDING_SOURCES, STATES, STANDARDS } = load();

    expect(ACTIVITY_FUNDING_SOURCES).toEqual(['HIT', 'HIE', 'MMIS']);
    expect(STATES.length).toBe(56);
    expect(STANDARDS.length).toBe(11);
  });
});

describe('provides default years based on now', () => {
  test('before October', () => {
    const clock = sinon.useFakeTimers();
    // tick forward 10 days, so we're not on the weird date boundary
    clock.tick(864000000);
    const { defaultAPDYearOptions, defaultAPDYears } = load();

    expect(defaultAPDYearOptions).toEqual(['1970', '1971', '1972']);
    expect(defaultAPDYears).toEqual(['1970', '1971']);

    clock.restore();
  });

  test('after October', () => {
    const clock = sinon.useFakeTimers();
    // tick forward 360 days
    clock.tick(31104000000);
    const { defaultAPDYearOptions, defaultAPDYears } = load();

    expect(defaultAPDYearOptions).toEqual(['1971', '1972', '1973']);
    expect(defaultAPDYears).toEqual(['1971', '1972']);

    clock.restore();
  });
});

describe('utility functions', () => {
  const {
    addObjVals,
    arrToObj,
    getParams,
    nextSequence,
    replaceNulls,
    stateLookup,
    titleCase
  } = load();

  test('replace nulls with empty strings in an object', () => {
    expect(replaceNulls({ foo: null, bar: 123 })).toEqual({
      foo: '',
      bar: 123
    });

    expect(replaceNulls({ foo: { bar: null, baz: 'abc' }, foo2: 123 })).toEqual(
      {
        foo: { bar: '', baz: 'abc' },
        foo2: 123
      }
    );
  });

  test('finds a state by two-letter code', () => {
    expect(stateLookup('Mo')).toEqual({ id: 'mo', name: 'Missouri' });
    expect(stateLookup('MO')).toEqual({ id: 'mo', name: 'Missouri' });
    expect(stateLookup('mo')).toEqual({ id: 'mo', name: 'Missouri' });
    expect(stateLookup('bob')).toEqual(undefined);
  });

  test('parses parameters from a URL query string', () => {
    expect(getParams('?hello=world&seven=7&bob&long=this%20is%20text')).toEqual(
      {
        hello: 'world',
        seven: '7',
        bob: null,
        long: 'this is text'
      }
    );
  });

  test('gets the next number in a sequence', () => {
    expect(nextSequence([1, 2, 6, 38, 3, 19])).toEqual(39);
  });

  test('converts an array into an object with array values as object keys', () => {
    expect(arrToObj(['a', 'b', 'c'])).toEqual({ a: 0, b: 0, c: 0 });
    expect(arrToObj(['a', 'b', 'c'], 'boop')).toEqual({
      a: 'boop',
      b: 'boop',
      c: 'boop'
    });
  });

  test('sums up the object values for a given object', () => {
    expect(addObjVals({ foo: 1, bar: 2 })).toEqual(3);
    expect(addObjVals({ a: 1, b: 2, c: -3 })).toEqual(0);
  });

  test('title cases a given string', () => {
    expect(titleCase('foo')).toEqual('Foo');
    expect(titleCase('foo bar')).toEqual('Foo Bar');
  });
});
