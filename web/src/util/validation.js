export const MESSAGES = {
  required: 'Please fill out this field',
  email: 'Please enter a valid email address'
};

export const required = val =>
  val === '' || val === null ? MESSAGES.required : null;

export const email = val =>
  val && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    ? MESSAGES.email
    : null;
