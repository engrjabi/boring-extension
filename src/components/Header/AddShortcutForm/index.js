import React from "react";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import _isEmpty from "lodash/isEmpty";
import Button from "@material-ui/core/Button";
import GenericTextField from "../../GenericComponents/GenericTextField";
import {
  arePropertiesAreEmpty,
  validateFormInput
} from "../../../utils/checkers";
import { getRandomImage } from "../../../utils/randomGenerator";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Refresh from "@material-ui/icons/Refresh";
import { DoSideEffectOnMount } from "../../../utils/lifecycle";
import { preventDefaultEvent } from "../../../utils/browserCommands";
import { addOrEditShortcutFormStyles } from "./style";
import {
  debouncedSetImageData,
  useGetFavico,
  useGetImageData
} from "../../../utils/imageManipulation";

const AddOrEditShortcutForm = ({
  classes,
  initialValues,
  addACard,
  closeModal
}) => {
  const [getImageLoading, getImageData] = useGetImageData();
  const [getFavicoLoading, getFavico] = useGetFavico();
  const gettingImageLoading = getImageLoading || getFavicoLoading;

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

  const setImageDataInFormik = (formikSetFieldValue, urlToUse) => {
    const url = urlToUse || getRandomImage();
    debouncedSetImageData(url, getImageData, formikSetFieldValue);
  };

  return (
    <div>
      <Formik
        initialValues={{
          launched: "0",
          title: "",
          link: "",
          img: "",
          imgData: null,
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
          setFieldValue
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
              disabled={gettingImageLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={gettingImageLoading}
                      onClick={async () => {
                        const parsedFavico = await getFavico(values.link);
                        if (parsedFavico) {
                          setImageDataInFormik(setFieldValue, parsedFavico);
                        }
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <GenericTextField
              label="Image URL"
              name="img"
              handleChange={e => {
                const imageUrl = e.target.value;
                handleChange(e);
                setImageDataInFormik(setFieldValue, imageUrl);
              }}
              handleBlur={handleBlur}
              error={Boolean(touched.img && errors.img)}
              value={values.img}
              errorMessage={errors.img}
              disabled={gettingImageLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={gettingImageLoading}
                      onClick={() => setImageDataInFormik(setFieldValue)}
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
                  setImageDataInFormik(setFieldValue);
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
                disabled={isSubmitting || gettingImageLoading}
              >
                {gettingImageLoading && "Getting Image"}
                {!gettingImageLoading && (
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
