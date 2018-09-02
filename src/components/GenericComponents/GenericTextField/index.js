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

	componentWillMount() {
		this.referenceField = null;
	}

	componentDidMount() {
		const { delayFocus } = this.props;
		if (delayFocus) {
			setTimeout(() => this.referenceField.focus(), 280);
		}
	}

	render() {
		const { classes, error, errorMessage, handleChange, handleBlur, name, label, value, autoFocus } = this.props;
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
					autoComplete='off'
					autoFocus={autoFocus}
					inputRef={refNode => this.referenceField = refNode}
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
	autoFocus: PropTypes.bool,
};

export default withStyles(styles)(GenericTextField);