import Rest from './Rest';
import store from '../store';
import Actions from '../store/actions/jobs';
import server from './server.json';

let useHttps = true;

const getUrl = ({ start, end }) => {
  const apiBaseUrl = server[useHttps ? 'https' : 'http'].apiBaseUrl;
  return `${apiBaseUrl}/jobs?start=${start.toISOString()}&end=${end.toISOString()}`;
}

const formatDate = (dateStr) => {
  const date = new Date(Date.parse(dateStr));
  return date.toDateString().substring(4, 10);
}

export async function execute(request) {
  let json;
  try {
    json = await Rest.GET(getUrl(request));
  } catch (e) {
    useHttps = false;
    json = await Rest.GET(getUrl(request));
  }
  const { dispatch } = store;
  const data = json.map(o => [
    formatDate(o.date),
    o.jobViews,
    o.predictedJobViews,
    o.activeJobs
  ]);
  dispatch(Actions.refresh(data));
}
