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
      <div>
        <label htmlFor='start' title='start'>Start:</label>
        <DatePicker id="start" selected={start} onChange={date => setStart(date)} />
      </div>
      <div>
        <label htmlFor='end' title='end'>End:</label>
        <DatePicker id='end' selected={end} onChange={date => setEnd(date)} />
      </div>
      <button disabled={!Utils.isLongerArray(jobs, 1)} type='button' onClick={clear}>Clear</button>
      <input disabled={start > end} type='submit' value='Submit' />
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
