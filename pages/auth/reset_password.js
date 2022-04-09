// MUI COMPONENTS
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

// FORMIK COMPONENTS
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

// YUP
import * as Yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/router";

const initialValues = {
  newPassword: "",
  confirmedPassword: "",
};

const AuthResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("Field is required"),
  confirmedPassword: Yup.string()
    .required("Field is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
const AuthResetPassword = ({ query }) => {
  const router = useRouter();
  const onSubmit = async (values) => {
    console.log(values);
    toast.success("Password changed !");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter a new password
        </Typography>

        <Box sx={{ mt: 4, width: "100%" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={AuthResetPasswordSchema}
            validateOnBlur={false}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="newPassword"
                    label="New password"
                    type="password"
                    //   placeholder="Enter your new password here"
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="confirmedPassword"
                    label="Confirm new password"
                    type="password"
                    //   placeholder="Enter your new password here"
                  />

                  <LoadingButton
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                    }}
                    disabled={!formik.isValid}
                    type="submit"
                    loading={formik.isSubmitting}
                    variant="contained"
                  >
                    Reset
                  </LoadingButton>
                </Form>
              );
            }}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/signin">
                <a>Sign In</a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/signup">
                <a>Dont have an account? Sign Up</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default AuthResetPassword;

export function getServerSideProps(ctx) {
  const query = ctx.query;
  if (query.activateCode == "" || query.activateCode == undefined) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      query,
    },
  };
}
