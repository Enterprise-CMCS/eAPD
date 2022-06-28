/**
 * Given a whole number, computes a series of percentages on it and
 * returns those percentages as whole numbers such that they sum up
 * exactly to the original number, using the Largest Remainder method
 *
 * @param {Number} number The whole number to be split across a range of
 *        percentages
 * @param {Array.<Number>} [percents=[1]] The percentage values to compute for
 *        the source value, such that the individual percentages are whole
 *        numbers that sum up to exactly the original number
 */
const roundedPercents = (number = 0, percents = [1]) => {
  // Take the floor of the original number, to guarantee that we're starting
  // with a whole number.  First step is to compute the real percentage
  // values and their sum.  Round off this sum to account for any weird
  // rounding issues (e.g., 23.000000000003).
  const realNumbers = percents.map(p => Math.floor(number) * p);
  const realSum = Math.round(realNumbers.reduce((sum, n) => sum + n, 0));

  // Then get just the decimal part of the real numbers.  We'll use these
  // for sorting purposes in a minute.
  const realRemainders = realNumbers.map(n => n - Math.floor(n));

  // And finally get the rounded percentage numbers along with the sum of
  // the rounded numbers.
  const roundedNumbers = realNumbers.map(n => Math.floor(n));
  const roundedSum = roundedNumbers.reduce((sum, n) => sum + n, 0);

  // Now we need to find out how far off our rounded sum is from the
  // real number.  We'll then spread that difference around the rounded
  // percentage values.
  const difference = Math.floor(realSum - roundedSum);

  if (difference !== 0) {
    // We want to spread the difference among the rounded numbers in order
    // of their remainders.  That is, the real number with the largest
    // decimal portion reflects which rounded number we would add one to
    // first.  Then we'll pick the next number and add one again.  Until
    // all of the difference is accounted for.
    const indicesByLargestRemainder = [...Array(realNumbers.length)]
      .map((_, i) => i)
      .sort((a, b) => {
        if (realRemainders[a] === realRemainders[b]) {
          return 0;
        }
        return realRemainders[a] > realRemainders[b] ? -1 : 1;
      });

    for (let i = 0; i < difference; i += 1) {
      roundedNumbers[indicesByLargestRemainder[i]] += 1;
    }
    return roundedNumbers;
  }
  return roundedNumbers;
};

export default roundedPercents;
