import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { execute } from '../../utils/Query';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Form() {
  const today = new Date();
  today.setMilliseconds(0);
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
      <button disabled={start > end}>submit</button>
		</form>
  );
}

export default Form;
