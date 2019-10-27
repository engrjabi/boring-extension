import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "formik";
import FormGroup from "@material-ui/core/FormGroup";

export const GenericCheckBox = connect(({ formik, label, name, color = "primary", onChange }) => {
  const currentValue = formik.values[name];

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={currentValue}
            onChange={() => {
              const newValue = !currentValue;
              formik.setFieldValue(name, newValue);
              if (onChange) {
                onChange(newValue);
              }
            }}
            value={name}
            color={color}
          />
        }
        label={label}
      />
    </FormGroup>
  );
});
