import React from "react";
import { connect } from 'react-redux';
import Chart from "react-google-charts";
import Utils from '../../utils/Utils';

function JobsChart({ jobs }) {
  const showChart = Utils.isLongerArray(jobs, 1);
  return (
    <div className="JobsChart">
      {!showChart && (<>
      <label>No Chart Data</label>
      </>)}
      {showChart && (
      <Chart
        width={ '1600px' }
        height={ '800px' }
        chartType='ComboChart'
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
