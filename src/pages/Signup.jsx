import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useRef } from "react";

const theme = createTheme();

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "blue",
      },
      "&:hover fieldset": {
        borderColor: "#000",
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue",
      },
    },
  },
})(TextField);

export default function SignUp() {
  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', passwordConfirm:''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />

          <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
            <div className="registrationForm" style={{ display: "flex" }}>
              {!mediaLessthanmd && (
                <Grid container style={{ flex: "6" }}>
                  <img
                    src="/signup.svg"
                    alt=""
                    style={{
                      height: "90%",
                      width: "90%",
                      backgroundSize: "cover",
                      opacity: "1",
                    }}
                  />
                </Grid>
              )}
              <div className="registrationFormContainer" style={{ flex: "6" }}>
                <Typography component="h1" variant="h5" sx={{ mb: "20" }}>
                  SIGN UP
                </Typography>

                <Grid
                  container
                  spacing={2}
                  style={{
                    display: mediaLessthanmd && "flex",
                    alignItems: mediaLessthanmd && "center",
                    justifyContent: mediaLessthanmd && "center",
                  }}
                >
                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      InputProps={{
                        style: {
                          color: "#000",
                        },
                      }}
                      type="password"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
          
                    />
                  </Grid>
                  <Grid item md={12} xs={8}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </form>
        </Container>
      </ThemeProvider>
    </>
  );
}
