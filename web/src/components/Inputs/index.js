import React from 'react';

import InputWrapper from './InputWrapper';
import { DollarInput, PercentInput } from './NumberInput';
import RichText from './RichText';

const Input = props => <input className="m0 input" {...props} />;

const Textarea = props => (
  <textarea className="m0 textarea" spellCheck="true" {...props} />
);

const DollarInputHolder = InputWrapper(DollarInput);
const InputHolder = InputWrapper(Input);
const PercentInputHolder = InputWrapper(PercentInput);
const TextareaHolder = InputWrapper(Textarea);

export {
  InputHolder as Input,
  TextareaHolder as Textarea,
  DollarInputHolder as DollarInput,
  PercentInputHolder as PercentInput,
  RichText
};
