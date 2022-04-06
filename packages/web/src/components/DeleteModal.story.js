import React from 'react';

import DeleteModal from './DeleteModal';

export default {
  title: 'DeleteModal',
  component: DeleteModal,
  parameters: {
    jest: ['DeleteModal.test.js']
  }
};

const Template = args => <DeleteModal {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  objType: 'Foo',
  objTitle: 'Bar',
  closer: () => null,
  onDelete: () => null
};
