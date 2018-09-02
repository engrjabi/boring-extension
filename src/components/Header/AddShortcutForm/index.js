import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import GenericTextField from '../../GenericComponents/GenericTextField';
import { arePropertiesAreEmpty, validateFormInput } from '../../../utils/checkers';

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%',
	},
	button: {
		margin: theme.spacing.unit,
		maxWidth: '250px',
		width: '100%',
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	submitButtonWrapper: {
		textAlign: 'center',
		margin: '2em 0 auto',
	},
	errorRemark: {
		color: red[500],
	}
});

class Basic extends Component {

	static defaultProps = {};

	generateInitialFormValues = () => {
		return {
			title: '',
			imgURL: '',
		}
	};

	handleValidation = (values) => {
		let errors = {};

		errors.title = validateFormInput(values.title, ['required', 'email']);
		errors.imgURL = validateFormInput(values.imgURL, ['required']);

		return arePropertiesAreEmpty(errors) ? {} : errors;
	};

	handleSubmit = (values, methods) => {
		console.log('submit action', {
			values,
			methods,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Formik
					initialValues={this.generateInitialFormValues()}
					validate={this.handleValidation}
					onSubmit={this.handleSubmit}
					render={({
						         values,
						         errors,
						         touched,
						         handleChange,
						         handleBlur,
						         handleSubmit,
						         isSubmitting,
					         }) => (
						<form onSubmit={handleSubmit}>
							<GenericTextField
								label="Title"
								name="title"
								handleChange={handleChange}
								handleBlur={handleBlur}
								error={Boolean(touched.title && errors.title)}
								value={values.title}
								errorMessage={errors.title}
							/>

							<GenericTextField
								label="Image URL"
								name="imgURL"
								handleChange={handleChange}
								handleBlur={handleBlur}
								error={Boolean(touched.imgURL && errors.imgURL)}
								value={values.imgURL}
								errorMessage={errors.imgURL}
							/>

							<div className={classes.submitButtonWrapper}>
								<Button variant="contained" color="primary"
								        className={classes.button} type="submit"
								        disabled={isSubmitting}>
									<AddIcon className={classes.leftIcon}/>
									Add
								</Button>
							</div>

						</form>
					)}
				/>
			</div>
		)
	}
}

Basic.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Basic);