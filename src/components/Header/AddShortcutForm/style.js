import red from "@material-ui/core/colors/red";

export const addOrEditShortcutFormStyles = theme => ({
  textField: {
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
