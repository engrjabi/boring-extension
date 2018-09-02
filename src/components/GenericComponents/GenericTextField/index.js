import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import classNames from 'classnames';

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%',
	},
	errorRemark: {
		color: red[500],
	}
});

class GenericTextField extends Component {

	render() {
		const { classes, error, errorMessage, handleChange, handleBlur, name, label, value } = this.props;
		return (
			<div>
				<TextField
					label={label}
					name={name}
					error={error}
					className={classes.textField}
					onChange={handleChange}
					onBlur={handleBlur}
					value={value}
					margin="normal"
				/>
				{error &&
				<FormHelperText className={classNames(classes.textField, classes.errorRemark)}>
					{errorMessage}
				</FormHelperText>}
			</div>
		)
	}
}

GenericTextField.propTypes = {
	classes: PropTypes.object.isRequired,
	error: PropTypes.any,
	errorMessage: PropTypes.string,
	handleChange: PropTypes.func,
	handleBlur: PropTypes.func,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default withStyles(styles)(GenericTextField);