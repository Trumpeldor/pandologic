import React from "react";
import Form from './components/Form';
import JobsChart from './components/JobsChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="logo" />
      <Form />
      <JobsChart />
    </div>
  );
}

export default App;
