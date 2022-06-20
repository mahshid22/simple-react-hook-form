import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const FormInputText = ({ name, control, label = "input" }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          variant="outlined"
          margin="normal"
          inputProps={{
            autoComplete: "none",
          }}
          label={label}
          {...field}
        />
      )}
      name={name}
      control={control}
    />
  );
};
export default FormInputText;
