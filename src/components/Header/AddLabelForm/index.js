import React from "react";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GenericTextField from "../../GenericComponents/GenericTextField";
import { arePropertiesAreEmpty, validateFormInput } from "../../../utils/checkers";
import { addOrEditLabelFormStyles } from "./style";

const AddOrEditLabelForm = ({ classes, initialValues, addACard, closeModal }) => {
  const handleValidation = values => {
    let errors = {};

    errors.title = validateFormInput(values.title, ["required"]);

    return arePropertiesAreEmpty(errors) ? {} : errors;
  };

  const handleSubmit = values => {
    addACard({
      ...values,
      lastUpdate: Date.now()
    });
    closeModal();
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          color: "",
          type: "label",
          ...initialValues
        }}
        validate={handleValidation}
        onSubmit={handleSubmit}
        render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, submitCount }) => (
          <form onSubmit={handleSubmit}>
            <GenericTextField
              label="Title"
              name="title"
              delayFocus={true}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(submitCount > 0 && touched.title && errors.title)}
              value={values.title}
              errorMessage={errors.title}
            />

            <div className={classes.submitButtonWrapper}>
              <Button variant="contained" color="primary" className={classes.button} type="submit">
                Add Label
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default withStyles(addOrEditLabelFormStyles)(AddOrEditLabelForm);
