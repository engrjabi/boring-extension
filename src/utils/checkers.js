export const validateFormInput = (valueToBeValidated, arrayOfValidFilters) => {
	let errorMessage;

	arrayOfValidFilters.every(filerName => {

		if (filerName === 'required') {
			if (!valueToBeValidated || valueToBeValidated === '') {
				errorMessage = 'This field is required';
				return false
			}
		}

		if (filerName === 'email') {
			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valueToBeValidated)) {
				errorMessage = 'Please enter email in proper format';
				return false
			}
		}

		return true
	});

	return errorMessage;
};

export function arePropertiesAreEmpty(obj) {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			const currrentProperty = obj[prop];
			if (currrentProperty && currrentProperty !== '' && currrentProperty !== 'false') {
				return false;
			}
		}
	}
	return true;
}