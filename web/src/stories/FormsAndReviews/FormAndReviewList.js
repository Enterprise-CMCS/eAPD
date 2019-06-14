import React, { Fragment, useState } from 'react';

import FormAndReviewList from '../../components/FormAndReviewList';

const Story = () => {
  const Collapsed = ({ expand, item, onDeleteClick }) => (
    <div>
      This is what gets rendered when key ${item.key} is in collapsed view [
      <button type="button" onClick={expand}>
        click to expand
      </button>
      ]
      {onDeleteClick && (
        <Fragment>
          {' '}
          [
          <button type="button" onClick={() => onDeleteClick(item.key)}>
            delete
          </button>
          ]
        </Fragment>
      )}
    </div>
  );
  const Expanded = ({ item }) => (
    <div>This is the expanded view of key ${item.key}</div>
  );

  const [list, setList] = useState([
    { initialCollapsed: true, key: `i${Math.round(Math.random() * 10000)}` },
    { initialCollapsed: false, key: `i${Math.round(Math.random() * 10000)}` }
  ]);
  const add = () => {
    setList([
      ...list,
      { initialCollapsed: false, key: `i${Math.round(Math.random() * 10000)}` }
    ]);
  };
  const remove = key => {
    setList(list.filter(item => item.key !== key));
  };

  return (
    <Fragment>
      <h1>Form and review list</h1>
      <hr />
      <div style={{ backgroundColor: '#F8FFF8' }}>
        <FormAndReviewList
          onAddClick={add}
          collapsed={Collapsed}
          expanded={Expanded}
          list={list}
          onDeleteClick={remove}
        />
      </div>
      <hr />
      Renders a list of objects as collapsed or expanded and handles toggling
      between those two states. Wraps the whole list in a container. A final
      rendering of just what‘s produced by this component might look like this:
      <pre>
        <code>
          &lt;div class="form-and-review-list"&gt;
          <br />
          {'  '}&lt;div class="form-and-review-list-item--collapsed"&gt;
          <br />
          {'    '}
          <strong>&lt;collapsed /&gt;</strong>
          <br />
          {'  '}&lt;/div&gt;
          <br />
          {'  '}&lt;div class="form-and-review-list-item--expanded"&gt;
          <br />
          {'    '}
          <strong>&lt;expanded /&gt;</strong>
          <br />
          {'    '}&lt;Button&gt;Done&lt;/Button&gt;
          <br />
          {'  '}&lt;/div&gt;
          <br />
          {'  '}&lt;Button class="visibility--screen"&gt;Add
          another&lt;/Button&gt;
          <br />
          &lt;/div&gt;
        </code>
      </pre>
      <h2>Props</h2>
      <ul>
        <li>
          <strong>
            <code>collapsed</code>
          </strong>{' '}
          - The component to use for the collapsed view of an item. It receives
          all the same props that were given to <code>FormAndReivewList</code>{' '}
          <em>except</em> <code>collapsed</code> and <code>expanded</code>. It
          will also receive an additional prop <code>expand</code>, which is a
          function that will cause the item to switch into expanded view.
          <br />
          <strong>
            <em>
              Note that this is a function, string, or class; not a rendered
              node.
            </em>
          </strong>
          The node will be constructed by the list.
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>expanded</code>
          </strong>{' '}
          - The component to use for the expanded view of an item. It receives
          all the same props that were given to <code>FormAndReivewList</code>{' '}
          <em>except</em> <code>collapsed</code> and <code>expanded</code>. It
          will also receive an additional prop <code>collapse</code>, which is a
          function that will cause the item to switch into collapsed view.
          <br />
          <strong>
            <em>
              Note that this is a function, string, or class; not a rendered
              node.
            </em>
          </strong>
          The node will be constructed by the list.
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>list</code>
          </strong>{' '}
          - An array of objects to be listed. Each object should have a{' '}
          <strong>
            <code>key</code>
          </strong>{' '}
          property (these are created and managed by our redux reducers) which
          is used to uniquely identify the node and also this key value is
          passed to{' '}
          <strong>
            <code>onDeleteClick</code>
          </strong>
          . It may also optionally have a{' '}
          <strong>
            <code>initialCollapsed</code>
          </strong>{' '}
          property to indicate the item‘s initial state in the list. This is
          also created by our redux reducers and API deserializer, but if the
          property happens to be absent, it defaults to{' '}
          <strong>
            <code>true</code>
          </strong>
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>addButtonText</code>
          </strong>{' '}
          - Text for the "Add another" button; defaults to{' '}
          <code>Add another</code>
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>noDataMessage</code>
          </strong>{' '}
          - Text to be displayed inside an alert panel if there are no items in
          the list. This should never actually happen because of our data is
          initialized, but just in case... Defaults to{' '}
          <code>This list is empty</code>
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>onAddClick</code>
          </strong>{' '}
          - Function to call when the "Add another" button is clicked. If
          falsey, the button will not be displayed.
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>onDeleteClick</code>
          </strong>{' '}
          - Function to call when the item indicates it wants to be deleted.
          Called with{' '}
          <strong>
            <code>item.key</code>
          </strong>{' '}
          value as an argument. Replaced with <code>null</code> if there is only
          one item in the list, preventing deletion altogether.
        </li>
        <li style={{ marginTop: '1em' }}>
          <strong>
            <code>anything else</code>
          </strong>{' '}
          - All other props get passed down to the{' '}
          <strong>
            <code>collapsed</code>
          </strong>{' '}
          and{' '}
          <strong>
            <code>expanded</code>
          </strong>{' '}
          components
        </li>
      </ul>
    </Fragment>
  );
};

export default Story;
