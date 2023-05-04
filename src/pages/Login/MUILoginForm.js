import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as StyledLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, refreshUserThunk } from 'redux/Auth/authOperations';
import { selectIsLoading, selectToken } from 'redux/Auth/authSelectors';
import { TailSpin } from 'react-loader-spinner';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <StyledLink
        color="inherit"
        href="https://discordapp.com/users/362645667962683393"
        rel="noreferrer noopener"
      >
        Danylo Dudaiev
      </StyledLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  React.useEffect(() => {
    if (token) {
      dispatch(refreshUserThunk());
    }
  }, [token, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    dispatch(loginUserThunk(userData));
  };

  return loading ? (
    <TailSpin
      height="80"
      width="80"
      color="#8B5CF6"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  className='font-family: "Roboto","Helvetica","Arial"; text-sm tracking-wide text-blue-600 underline decoration-blue-400/50 hover:decoration-blue-400'
                  to="/register"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
