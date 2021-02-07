import React from "react";
import { connect } from 'react-redux';
import Chart from "react-google-charts";

function JobsChart({ jobs }) {
  return (
    <div className="JobsChart">
      {(!Array.isArray(jobs) || jobs.length <= 1) && (<>
      <label>No Chart data</label>
      </>)}
      {Array.isArray(jobs) && jobs.length > 1 && (
      <Chart
        width={ '1600px' }
        height={ '800px' }
        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={ jobs }
        options={{
          title: 'Cumulative job views vs. predictions',
          vAxis: { title: 'Jobs' },
          hAxis: { title: 'Day' },
          seriesType: 'line',
          series: { 2: { type: 'bars' } },
        }}
      />)}
    </div>
  );
}

export default connect(
	state => ({
		jobs: state.jobs
	})
)(JobsChart)
