const load = async () => {
  jest.resetModules();
  return import('./index'); // eslint-disable-line global-require
};

describe('utility arrays', () => {
  test('constant shared arrays are as expected', async () => {
    const { ACTIVITY_FUNDING_SOURCES, STATES, STANDARDS } = await load();

    expect(ACTIVITY_FUNDING_SOURCES).toEqual(['HIT', 'HIE', 'MMIS']);
    expect(STATES.length).toBe(56);
    expect(STANDARDS.length).toBe(11);
  });
});

describe('utility functions', () => {
  let applyToNumbers;
  let getParams;
  let stateDateToDisplay;
  let stateDateRangeToDisplay;
  let stateLookup;
  beforeAll(async () => {
    ({
      applyToNumbers,
      getParams,
      stateDateToDisplay,
      stateDateRangeToDisplay,
      stateLookup
    } = await load());
  });

  test('apply a function to numbers in an object, deeply', () => {
    expect(applyToNumbers({ a: 1, b: 2, c: { d: 7 } }, () => 'boop')).toEqual({
      a: 'boop',
      b: 'boop',
      c: { d: 'boop' }
    });
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

  test('converts a state-formatted date string into a display string', () => {
    expect(stateDateToDisplay('2014-04-03')).toEqual('4/3/2014');
    expect(stateDateToDisplay(null)).toEqual('Date not specified');
    expect(stateDateToDisplay()).toEqual('Date not specified');
  });

  test('converts two state-formatted date strings into a display date range', () => {
    expect(stateDateRangeToDisplay('2014-04-03', '2015-04-19')).toEqual(
      '4/3/2014 - 4/19/2015'
    );
    expect(stateDateRangeToDisplay(null, null)).toEqual(
      'Date not specified - Date not specified'
    );
    expect(stateDateRangeToDisplay('2014-04-03', null)).toEqual(
      '4/3/2014 - Date not specified'
    );
    expect(stateDateRangeToDisplay(null, '2015-04-09')).toEqual(
      'Date not specified - 4/9/2015'
    );
    expect(stateDateRangeToDisplay(null, '9999-01-99')).toEqual(
      'Date not specified - Invalid date'
    );
    expect(stateDateRangeToDisplay('2020-14-35', '9999-01-99')).toEqual(
      'Invalid date - Invalid date'
    );
    expect(stateDateRangeToDisplay()).toEqual(
      'Date not specified - Date not specified'
    );
  });
});
