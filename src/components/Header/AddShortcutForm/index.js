import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import _isEmpty from "lodash/isEmpty";
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

const AddOrEditShortcutForm = ({
  classes,
  initialValues,
  addACard,
  closeModal
}) => {
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [initialValuesState, setInitialValuesState] = useState({
    launched: "0",
    title: "",
    link: "",
    ...initialValues
  });

  useEffect(() => {
    (async () => {
      setLoadingInitialData(true);
      if (!initialValues.img) {
        const { url, dataUrl } = await getRandomImage();
        setInitialValuesState(prev => ({
          ...prev,
          img: url,
          imgData: dataUrl
        }));
      }
      setLoadingInitialData(false);
    })();
  }, [initialValues.img]);

  const handleValidation = values => {
    let errors = {};

    errors.title = validateFormInput(values.title, ["required"]);
    errors.img = validateFormInput(values.img, ["required"]);
    errors.link = validateFormInput(values.link, ["required"]);

    return arePropertiesAreEmpty(errors) ? {} : errors;
  };

  const handleSubmit = values => {
    addACard(values);
    closeModal();
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValuesState}
        validate={handleValidation}
        onSubmit={handleSubmit}
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
            {loadingInitialData && <div>Loading random image</div>}

            <GenericTextField
              label="Title"
              name="title"
              delayFocus={true}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(submitCount > 0 && touched.title && errors.title)}
              value={values.title}
              errorMessage={errors.title}
              disabled={loadingInitialData}
            />

            <GenericTextField
              label="Image URL"
              name="img"
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder={"gg"}
              error={Boolean(touched.img && errors.img)}
              value={values.img}
              errorMessage={errors.img}
              disabled={loadingInitialData}
              InputLabelProps={{
                shrink: true
              }}
            />

            <GenericTextField
              label="Link"
              name="link"
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.link && errors.link)}
              value={values.link}
              errorMessage={errors.link}
              disabled={loadingInitialData}
            />

            <div className={classes.submitButtonWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                disabled={isSubmitting || loadingInitialData}
              >
                {_isEmpty(initialValues) ? "Add" : "Edit"} Shortcut
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default withStyles(styles)(AddOrEditShortcutForm);
