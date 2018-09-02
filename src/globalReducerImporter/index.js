import { sortObjKeysAlphabetically } from '../utils/formatters';
import rawReducers from './rawReducers';

const sortedReducer = sortObjKeysAlphabetically({
	...rawReducers,
});

export default sortedReducer;
