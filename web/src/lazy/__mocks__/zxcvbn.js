import zxcvbn from 'zxcvbn';

// In a weird twist, the mock version of the lazy-loading zxcvbn wrapper should
// simply return the real zxcvbn immediately. ¯\_(ツ)_/¯
export default zxcvbn;
