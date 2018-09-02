import { combineForms } from 'react-redux-form';
import dashboardForms from '../../containers/Dashboard/formReducers';

export default {
	dashboardForms: combineForms({
		...dashboardForms
	}, 'dashboardForms'),
};