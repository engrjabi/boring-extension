import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import GenericTextField from "../../GenericComponents/GenericTextField";
import {
  arePropertiesAreEmpty,
  validateFormInput
} from "../../../utils/checkers";
import { getRandomImage } from "../../../utils/randomGenerator";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    maxWidth: "250px",
    width: "100%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  submitButtonWrapper: {
    textAlign: "center",
    margin: "2em 0 auto"
  },
  errorRemark: {
    color: red[500]
  }
});

class AddShortcutForm extends Component {
  generateInitialFormValues = () => {
    const { initialValues } = this.props;
    return {
      launched: "0",
      title: "",
      link: "",
      img: getRandomImage(),
      ...initialValues
    };
  };

  handleValidation = values => {
    let errors = {};

    errors.title = validateFormInput(values.title, ["required"]);
    errors.img = validateFormInput(values.img, ["required"]);
    errors.link = validateFormInput(values.link, ["required"]);

    return arePropertiesAreEmpty(errors) ? {} : errors;
  };

  handleSubmit = values => {
    const { addACard, closeModal } = this.props;
    addACard(values);
    closeModal();
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
            submitCount
          }) => (
            <form onSubmit={handleSubmit}>
              <GenericTextField
                label="Title"
                name="title"
                delayFocus={true}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={Boolean(
                  submitCount > 0 && touched.title && errors.title
                )}
                value={values.title}
                errorMessage={errors.title}
              />

              <GenericTextField
                label="Image URL"
                name="img"
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={Boolean(touched.img && errors.img)}
                value={values.img}
                errorMessage={errors.img}
              />

              <GenericTextField
                label="Link"
                name="link"
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={Boolean(touched.link && errors.link)}
                value={values.link}
                errorMessage={errors.link}
              />

              <div className={classes.submitButtonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <AddIcon className={classes.leftIcon} />
                  Add
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

AddShortcutForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddShortcutForm);
