import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Box, Button, Input, Label, Subhead, Textarea } from 'rebass';

import Table from './Table';

const columns = {
  title: 'Staff Title',
  percentTime: 'Percent of Time',
  hours: 'Project Hours',
  cost: 'Cost with Benefits',
  responsibilities: 'Responsibilities'
};

const colKeys = Object.keys(columns);
const colVals = colKeys.map(k => columns[k]);

const seed = [
  {
    id: 1,
    title: 'CEO',
    percentTime: '100%',
    hours: '500',
    cost: '$1,000,000',
    responsibilities: 'Everything'
  },
  {
    id: 2,
    title: 'CTO',
    percentTime: '75%',
    hours: '500',
    cost: '$800,000',
    responsibilities: 'Various tasks'
  }
];

const seedOther = [
  ['Director', '15%', 200, '$1,000,000', 'Oversee program'],
  ['Jennifer', '20%', 100, '$50,000', 'Various tasks'],
  ['Steve', '5%', 100, '$10,000', 'Various tasks']
];

// const moreEntries = [
//   { id: 1, field: '' }
// ]

const formData = el => {
  const [data, obj] = [new FormData(el), {}];

  [...data.entries()].forEach(([key, value]) => {
    obj[key] = value;
  });

  return obj;
};

const Cell = ({ name }) => (
  <td>
    <Input type="text" name={name} />
  </td>
);

Cell.propTypes = {
  name: PropTypes.string.isRequired
};

class Personnel extends Component {
  state = { data: [...seed], data2: [...seedOther] };

  addRow = () => {
    this.setState(prev => ({
      data: [
        ...prev.data,
        {
          id: prev.data.reduce((maxId, d) => Math.max(d.id, maxId), -1) + 1
        }
      ]
    }));
  };

  deleteRow = id => () => {
    this.setState(prev => ({ data: prev.data.filter(d => d.id !== id) }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const data = formData(e.target);
    const values = colKeys.map(key => data[key] || 'N/A');

    this.setState(prev => ({ data2: [...prev.data2, values] }));
  };

  render() {
    const { data, data2 } = this.state;

    return (
      <div>
        <Box mb={4}>
          <table>
            <thead>
              <tr>
                {colVals.map(c => <th key={c}>{c}</th>)}
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  {colKeys.map(c => <Cell key={c} name={`${c}-${d.id}`} />)}
                  <td>
                    <Button bg="gray" onClick={this.deleteRow(d.id)}>
                      ×
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button mt={3} onClick={this.addRow}>
            Add row
          </Button>
        </Box>

        <Box mb={4} w={[1, 1 / 2]}>
          <Subhead mb={2}>Add person</Subhead>
          <form onSubmit={this.handleSubmit}>
            <Box mb={3}>
              <Label>Staff Title</Label>
              <Input name="title" required />
            </Box>
            <Box mb={3}>
              <Label>Percent of Time</Label>
              <Input name="percent_time" required />
            </Box>
            <Box mb={3}>
              <Label>Project Hours</Label>
              <Input name="hours" required />
            </Box>
            <Box mb={3}>
              <Label>Cost with Benefits</Label>
              <Input name="cost" required />
            </Box>
            <Box mb={3}>
              <Label>Responsibilities</Label>
              <Textarea name="responsibilities" required />
            </Box>
            <Button type="submit">Save</Button>
          </form>
        </Box>

        <Box mb={4}>
          <Subhead mb={2}>Personnel</Subhead>
          <Table heading={colVals} data={data2} />
        </Box>
      </div>
    );
  }
}

export default Personnel;
