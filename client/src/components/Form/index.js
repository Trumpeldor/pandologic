import React, { useState } from "react";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { execute } from '../../net/Query';
import Actions from '../../store/actions/jobs';
import Utils from '../../utils/Utils';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const today = new Date();
today.setMilliseconds(0);

function Form({ jobs, clear }) {
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const handleSubmit = (e) => {
    e.preventDefault();
    execute({ start, end });
  };
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td><label htmlFor='start'>Start Date:</label></td>
          <td><DatePicker id='start' title='Start Date' selected={start} onChange={date => setStart(date)} /></td>
        </tr>
        <tr>
          <td><label htmlFor='end'>End Date:</label></td>
          <td><DatePicker id='end' title='End Date' selected={end} onChange={date => setEnd(date)} /></td>
        </tr>
        </tbody>
      </table>
      <div>
        <button title='Clear the chart' disabled={!Utils.isLongerArray(jobs, 1)} type='button' onClick={clear}>Clear</button>
        <input title='Submit the dates' disabled={start > end} type='submit' value='Submit' />
      </div>
    </form>
  );
}

export default connect(
  state => ({
    jobs: state.jobs
  }),
  dispatch => ({
    clear: () => dispatch(Actions.clear())
  })
)(Form)
