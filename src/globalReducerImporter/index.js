import { sortObjKeysAlphabetically } from '../utils/Formatters';
import rawReducers from './rawReducers';

const sortedReducer = sortObjKeysAlphabetically({
	...rawReducers,
});

export default sortedReducer;
