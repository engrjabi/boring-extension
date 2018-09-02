import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import classNames from 'classnames';

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
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Formik
					initialValues={{
						title: '',
						imgURL: '',
					}}
					validate={values => {
						// same as above, but feel free to move this into a class method now.
						let errors = {};
						if (!values.title) {
							errors.title = 'Required';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.title)
						) {
							errors.title = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(
						values,
						{ setSubmitting, setErrors /* setValues and other goodies */ }
					) => {
						console.log('submiting form', {
							values,
						});
					}}
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

							<TextField
								required
								label="Title"
								name="title"
								error={touched.title && errors.title}
								className={classes.textField}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								margin="normal"
							/>
							{touched.title && errors.title &&
							<FormHelperText className={classNames(classes.textField, classes.errorRemark)}>
								{errors.title}
							</FormHelperText>}

							<TextField
								required
								label="Image URL"
								name="imgURL"
								className={classes.textField}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.imgURL}
								margin="normal"
							/>
							{touched.imgURL && errors.imgURL &&
							<FormHelperText className={classNames(classes.textField, classes.errorRemark)}>
								{errors.imgURL}
							</FormHelperText>}

							<div className={classes.submitButtonWrapper}>
								<Button variant="contained" color="primary" className={classes.button} type="submit"
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