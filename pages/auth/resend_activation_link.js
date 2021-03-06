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

// AXIOS
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const initialValues = {
  email: "",
};

const ResendActivationLinkSchema = Yup.object().shape({
  email: Yup.string().email("Email invalid !").required("Field required !"),
});
const ResendActivationLink = () => {
  const { jwt } = useSelector((state) => state.storeManage);
  useEffect(() => {
    if (jwt != "null") {
      router.push("/");
    }
  }, [jwt]);
  const onSubmit = async (values) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/ReActivationAccount`,
      {
        email: values.email,
      }
    );

    if (res.status === 200) {
      if (res.data.success == true) {
        toast.success(res.data.message);
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
          Resend activation link
        </Typography>

        <Box sx={{ mt: 4, width: "100%" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ResendActivationLinkSchema}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email to reset password"
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
                    Resend
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
export default ResendActivationLink;
