import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FormikMuiTextInput from "./FormikMuiTextInput";

type AuthForm = {
  email: string;
  password: string;
};

const BoxFormRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

type AuthFormProps = {
  onSubmit: (values: AuthForm) => Promise<void>;
  errors?: string[];
};
const AuthForm = ({ onSubmit, errors = [] }: AuthFormProps) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        password: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      })}
      onSubmit={async (values: AuthForm, { setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <BoxFormRow>
            <FormikMuiTextInput
              fullWidth
              name="email"
              label={"email"}
              type={"text"}
              sx={{ marginBottom: "1rem" }}
            />
            <FormikMuiTextInput
              name="password"
              label={"password"}
              type={"text"}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <Paper sx={{ padding: "5px" }}>
              {errors.map((e) => (
                <Typography key={e}>{e}</Typography>
              ))}
            </Paper>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </BoxFormRow>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
