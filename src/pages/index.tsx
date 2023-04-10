import { useApi } from '@/providers/ApiProvider';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});

  const { userService } = useApi();

  async function onGetUser() {
    const response = await userService.me(username);

    console.log(response);

    if (response.data) setUser(response.data);
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        component={Paper}
        square
        display="flex"
        flexDirection="column"
      >
        <Box
          sx={{
            flex: 1,
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {process.env.NEXT_PUBLIC_APP_TITLE}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={'Github username'}
              onChange={(e: any) => setUsername(e.target.value)}
              autoFocus
              value={username}
            />

            <Button onClick={() => onGetUser()}>get user</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
