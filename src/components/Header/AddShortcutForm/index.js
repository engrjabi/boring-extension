import React from "react";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";
import Button from "@material-ui/core/Button";
import GenericTextField from "../../GenericComponents/GenericTextField";
import {
  arePropertiesAreEmpty,
  validateFormInput
} from "../../../utils/checkers";
import {
  getRandomImage,
  useGetImageData
} from "../../../utils/randomGenerator";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Refresh from "@material-ui/icons/Refresh";
import { DoSideEffectOnMount } from "../../../utils/lifecycle";
import { preventDefaultEvent } from "../../../utils/browserCommands";
import { addOrEditShortcutFormStyles } from "./style";

const debouncedSetImageData = _debounce(
  async (url, getImageData, formikValues, formikSetValues) => {
    const imgData = await getImageData(url);
    formikSetValues({
      ...formikValues,
      img: url,
      imgData
    });
  },
  500
);

const AddOrEditShortcutForm = ({
  classes,
  initialValues,
  addACard,
  closeModal
}) => {
  const [getImageLoading, getImageData] = useGetImageData();

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

  const setRandomImage = (formikValues, formikSetValues) => {
    const url = getRandomImage();
    debouncedSetImageData(url, getImageData, formikValues, formikSetValues);
  };

  return (
    <div>
      <Formik
        initialValues={{
          launched: "0",
          title: "",
          link: "",
          ...initialValues
        }}
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
          submitCount,
          setValues
        }) => (
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

            <GenericTextField
              label="Link"
              name="link"
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={Boolean(touched.link && errors.link)}
              value={values.link}
              errorMessage={errors.link}
            />

            <GenericTextField
              label="Image URL"
              name="img"
              handleChange={e => {
                const value = e.target.value;
                handleChange(e);
                debouncedSetImageData(value, getImageData, values, setValues);
              }}
              handleBlur={handleBlur}
              error={Boolean(touched.img && errors.img)}
              value={values.img}
              errorMessage={errors.img}
              disabled={getImageLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={getImageLoading}
                      onClick={() => setRandomImage(values, setValues)}
                    >
                      <Refresh />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <DoSideEffectOnMount
              sideEffect={() => {
                if (!values.img) {
                  setRandomImage(values, setValues);
                }
              }}
            />

            {!_isEmpty(values.img) && values.imgData && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "0.625rem"
                }}
              >
                <img
                  src={values.imgData}
                  style={{
                    maxHeight: 100
                  }}
                  onDragStart={preventDefaultEvent}
                  alt="preview"
                />
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    opacity: "0.7"
                  }}
                >
                  Image preview
                </div>
              </div>
            )}

            <div className={classes.submitButtonWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                disabled={isSubmitting || getImageLoading}
              >
                {getImageLoading && "Getting Image"}
                {!getImageLoading && (
                  <>
                    {_isEmpty(initialValues) ? "Add Shortcut" : "Edit Shortcut"}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default withStyles(addOrEditShortcutFormStyles)(AddOrEditShortcutForm);
