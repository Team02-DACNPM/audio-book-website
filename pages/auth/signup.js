// import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
// MUI COMPONENTS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";

// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

// CUSTOM ICONS
import GoogleIcon from "../../assets/GoogleIcon";
import FacebookIcon from "../../assets/FacebookIcon";

// FORMIK COMPONENTS
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

// // MY COMPONENTS
// import AuthCopyright from "../../components/auth/AuthCopyright";

// RouterLink
// import { Link as RouterLink } from "react-router-dom";

// YUP
import * as Yup from "yup";
import axios from "axios";

// HOOKS
// import { useAuth } from "../../hooks";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email invalid !").required("Field required !"),
  password: Yup.string().required("Field required !"),
  confirmPassword: Yup.string().required("Field required !"),
});

const Index = () => {
  const router = useRouter();

  const onSubmit = async (values) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        email: values.email,
        password: values.password,
      }
    );

    if (values.password != values.confirmPassword) {
      toast.error("Password not match!!!");
      return;
    }

    if (res.status === 200) {
      if (res.data.success == true) {
        toast.success(
          "Sign up success, please check your email to verify your account"
        );
        // router.push("/auth/signin");
      } else {
        toast.error(res.data.message);
      }
    }
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
          Sign Up
        </Typography>

        <Box sx={{ mt: 4 }}>
          {/* <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Normal Account</AlertTitle>
            <div>
              Email Address : <strong>doanquochiep32@gmail.com</strong>
            </div>
            <div>
              Password : <strong>1</strong>
            </div>
          </Alert>
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Admin Account</AlertTitle>
            <div>
              Email Address : <strong>1712032@student.hcmus.edu.vn</strong>
            </div>
            <div>
              Password : <strong>1</strong>
            </div>
          </Alert> */}
          {/* {message.text && (
            <Alert severity={message.status} sx={{ mb: 2 }}>
              <div>{message.text}</div>
            </Alert>
          )} */}
          <div></div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignInSchema}
            validateOnBlur={false}
            // validateOnChange={false}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    autoFocus
                  />

                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
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
                    Sign Up
                  </LoadingButton>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <Button
                    fullWidth
                    variant="outlined"
                    // onClick={signInWithGoogle}
                    startIcon={<GoogleIcon />}
                    sx={{
                      mt: 3,
                      border: "none",
                      "&:hover": {
                        border: "none",
                      },
                      color: "text.secondary",
                      //   textTransform: "none",
                    }}
                    component={Card}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    Sign Up With Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    // onClick={signInWithGoogle}
                    startIcon={<FacebookIcon />}
                    sx={{
                      mt: 2,
                      mb: 3,
                      border: "none",
                      "&:hover": {
                        border: "none",
                      },
                      color: "text.secondary",
                      //   textTransform: "none",
                    }}
                    component={Card}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    Sign Up With Facebook
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/auth/signin">
                <a>I already have an account</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <AuthCopyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};
export default Index;
