import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import {
  RawContacts as Contacts,
  RawFormStateContacts as FormStateContacts
} from './FormStateContacts';

describe('the Form: state contacts component', () => {
  describe('FormStateContacts', () => {
    const handleSubmit = sinon.spy();
    const stateName = 'test state name';
    let submitting = false;
    beforeEach(() => {
      handleSubmit.resetHistory();
      submitting = true;
    });

    it('renders correctly when not actively submitting', () => {
      const component = shallow(
        <FormStateContacts
          handleSubmit={handleSubmit}
          stateName={stateName}
          submitting={submitting}
        />
      );
      expect(component).toMatchSnapshot();
    });

    it('renders correctly when actively submitting', () => {
      submitting = true;
      const component = shallow(
        <FormStateContacts
          handleSubmit={handleSubmit}
          stateName={stateName}
          submitting={submitting}
        />
      );
      expect(component).toMatchSnapshot();
    });

    it('calls handleSubmit on form submit', () => {
      const component = shallow(
        <FormStateContacts
          handleSubmit={handleSubmit}
          stateName={stateName}
          submitting={submitting}
        />
      );

      component.find('form').simulate('submit');

      expect(handleSubmit.callCount).toEqual(1);
    });
  });

  describe('Contacts', () => {
    const meta = {
      error: '',
      submitFailed: false
    };
    const fields = {
      map: fn => [{}, {}].map(fn),
      push: sinon.spy(),
      remove: sinon.spy()
    };

    beforeEach(() => {
      meta.error = '';
      meta.submitFailed = false;
      fields.length = 0;
      fields.push.resetHistory();
      fields.remove.resetHistory();
    });

    it('renders correctly when there was no submission error', () => {
      const component = shallow(<Contacts fields={fields} meta={meta} />);
      expect(component).toMatchSnapshot();
    });

    it('renders correctly when there was a submission error', () => {
      meta.error = 'test error message';
      meta.submitFailed = true;

      const component = shallow(<Contacts fields={fields} meta={meta} />);
      expect(component).toMatchSnapshot();
    });

    it('adds a contact when the add button is pressed', () => {
      const component = shallow(<Contacts fields={fields} meta={meta} />);

      component.find('button.btn.btn-primary.bg-blue').simulate('click');

      expect(fields.push.calledWith({})).toBe(true);
    });

    it('removes a contact when the remove button is pressed', () => {
      const component = shallow(<Contacts fields={fields} meta={meta} />);

      component
        .find('button[title="Remove Contact"]')
        .first()
        .simulate('click');

      expect(fields.remove.calledWith(0)).toBe(true);
    });
  });
});
