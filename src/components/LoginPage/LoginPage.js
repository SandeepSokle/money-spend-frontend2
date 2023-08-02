import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./LoginPage.css";
import { get_user_detail, user_login, user_signUp } from "../functions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLogin) {
      if (data.email !== "" && data.password !== "") {
        try {
          const user = await user_login({
            email: data.email,
            password: data.password,
            dispatch,
          });
          if (user) {
            get_user_detail({ dispatch });
            navigate("/");
          }
        } catch (err) {
          return;
        }
      }
    } else {
      if (
        data.address !== "" &&
        data.phone !== "" &&
        data.name !== "" &&
        data.email !== "" &&
        data.password !== ""
      ) {
        try {
          const user = await user_signUp({
            userDetail: data,
          });
          if (user) {
            navigate("/");
          }
        } catch (err) {
          return;
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className="section"
            sx={{
              my: `${isLogin ? 8 : 2}`,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "98vh",
              overflow: "auto",
              padding: "10px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Sign in" : "SignUp"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {isLogin ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    // name="data.email"
                    autoComplete="email"
                    autoFocus
                    value={data.email}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, email: ele.target.value };
                      });
                    }}
                    size="medium"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    // name="data.password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    size="medium"
                    value={data.password}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, password: ele.target.value };
                      });
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="name"
                    label="Enter Name"
                    // name="data.name"
                    autoComplete="name"
                    autoFocus
                    size="small"
                    value={data.name}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, name: ele.target.value };
                      });
                    }}
                  />
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="phone"
                    label="Enter Phone Number"
                    autoComplete="phone"
                    autoFocus
                    size="small"
                    value={data.phone}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, phone: ele.target.value };
                      });
                    }}
                  />
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    // name="data.email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                    value={data.email}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, email: ele.target.value };
                      });
                    }}
                  />
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="address"
                    label="Enter Address"
                    // name="data.address"
                    autoComplete="address"
                    autoFocus
                    size="small"
                    value={data.address}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, address: ele.target.value };
                      });
                    }}
                  />
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    // name="data.password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    size="small"
                    value={data.password}
                    onChange={(ele) => {
                      setData(() => {
                        return { ...data, password: ele.target.value };
                      });
                    }}
                  />
                </>
              )}
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                {isLogin ? "Sign in" : "SignUp"}
              </Button>
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{
                  mt: 2,
                  mb: 1,
                }}
              >
                <GoogleIcon
                  fontSize="20px"
                  sx={{
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                />
                {isLogin ? "Sign in With Google" : "SignUp With Google"}
              </Button> */}
              <Box
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {isLogin ? (
                  <Button
                    // type="submit"
                    fullWidth
                    variant="text"
                    sx={{ mt: 2, mb: 2, textTransform: "capitalize" }}
                    // onClick={() => {
                    //   setIsLogin(!isLogin);
                    // }}
                  >
                    forget password
                  </Button>
                ) : null}
                <Button
                  // type="submit"
                  fullWidth
                  variant="text"
                  sx={{ mt: 2, mb: 2, textTransform: "capitalize" }}
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "I have an account? Sign In"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
