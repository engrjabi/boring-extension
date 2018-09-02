import { sortObjKeysAlphabetically } from '../utils/Formatters';
import rawReducers from './rawReducers';
import reactReduxForms from './reactReduxForms';

const sortedReducer = sortObjKeysAlphabetically({
	...rawReducers,
	...reactReduxForms,
});

export default sortedReducer;
