let zxcvbn = () => ({ score: 0 });

export default (...args) => {
  import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn').then(real => {
    zxcvbn = real.default;
  });

  return zxcvbn(...args);
};
