import { MESSAGES, required, email } from './validation';

describe('form validation functions', () => {
  test('required', () => {
    expect(required('')).toBe(MESSAGES.required);
    expect(required(null)).toBe(MESSAGES.required);

    expect(required('abc')).toBeNull();
    expect(required(123)).toBeNull();
    expect(required(0)).toBeNull();
  });

  test('email', () => {
    expect(email('not-an-email')).toBe(MESSAGES.email);
    expect(email('@')).toBe(MESSAGES.email);
    expect(email('foo@bar')).toBe(MESSAGES.email);

    expect(email('foo@bar.com')).toBeNull();
    expect(email('therealharrypotter@gmail.com')).toBeNull();
  });
});
