import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import Icon, { faHelp } from '../Icons';
import { EDITOR_CONFIG } from '../../util/editor';

class CostAllocation extends Component {
  state = {
    entries: [
      { id: 1, name: 'Medicaid', value: 100 },
      { id: 2, name: '', value: 0 },
      { id: 3, name: '', value: 0 }
    ]
  };

  update = id => e => {
    const { name, value } = e.target;
    const valNorm = name === 'value' ? Number(value) : value;

    this.setState(prev => ({
      entries: prev.entries.map(
        d => (d.id === id ? { ...d, [name]: valNorm } : d)
      )
    }));
  };

  render() {
    const { entries } = this.state;
    const total = entries.reduce((acc, curr) => acc + curr.value, 0);

    return (
      <div>
        <div className="mb3">
          <div className="mb1 bold">
            Methodology
            <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
          </div>
          <Editor toolbar={EDITOR_CONFIG} />
        </div>
        <div className="mb3 overflow-auto">
          <table
            className="h5 table table-fixed sm-col-9"
            style={{ minWidth: 400 }}
          >
            <thead>
              <tr>
                <th className="col-1">#</th>
                <th className="col-7">Entity</th>
                <th className="col-4">Percent of Cost</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(d => (
                <tr key={d.id}>
                  <td className="mono">{d.id}.</td>
                  <td>
                    <input
                      type="text"
                      className="m0 input"
                      name="name"
                      value={d.name}
                      onChange={this.update(d.id)}
                    />
                  </td>
                  <td className="align-middle">
                    <div className="flex">
                      <input
                        type="range"
                        className="input-range"
                        name="value"
                        step="5"
                        value={d.value}
                        onChange={this.update(d.id)}
                      />
                      <span
                        className={`ml-tiny mono bold ${
                          total !== 100 ? 'red' : ''
                        }`}
                      >
                        {d.value}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="mb1 bold">Other Funding Sources</div>
          <div className="clearfix mxn2">
            <div className="col col-12 sm-col-9 px2">
              <div className="mb-tiny h5">Description:</div>
              <Editor toolbar={EDITOR_CONFIG} />
            </div>
            <div className="col col-12 sm-col-3 px2">
              <div className="mb-tiny h5">Total Amount:</div>
              <input type="text" className="m0 input" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CostAllocation;
