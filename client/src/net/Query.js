import Rest from './Rest';
import store from '../store';
import Actions from '../store/actions/jobs';
import server from './server.json';

const getUrl = ({ start, end }) => {
  return `${server.https.apiBaseUrl}/jobs?start=${start.toISOString()}&end=${end.toISOString()}`;
}

const formatDate = (dateStr) => {
  const date = new Date(Date.parse(dateStr));
  return date.toDateString().substring(4, 10);
}

export async function execute(request) {
  const jsonArr = await Rest.GET(getUrl(request));
  const { dispatch } = store;
  const data = jsonArr.map(o => [
    formatDate(o.date),
    o.jobViews,
    o.predictedJobViews,
    o.activeJobs
  ]);
  dispatch(Actions.refresh(data));
}
