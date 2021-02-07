import Rest from '../net/Rest';
import store from '../store';
import Actions from '../store/actions/jobs';
import config from '../config.json';

const getUrl = ({ start, end }) => {
	return `${config.dev.apiBaseUrl}/api/jobs?start=${start.toISOString()}&end=${end.toISOString()}`;
}

const formatDate = (dateStr) => {
	const date = new Date(Date.parse(dateStr));
	return date.toDateString().substring(4).substring(0, 6);
}

export async function execute(request) {
	const json = await Rest.GET(getUrl(request));
	const { dispatch } = store;
	const data = json.map(o => [
		formatDate(o.date),
		o.jobViews,
		o.predictedJobViews,
		o.activeJobs
	]);
	dispatch(Actions.refresh(data));
}
