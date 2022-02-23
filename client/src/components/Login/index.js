import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import {
    Button, 
    CssBaseline, 
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
} from '@mui/material/';

export default function Login() {
    
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('')
        const data = new FormData(e.currentTarget);  
        axios({
            method: 'post',
            url: '/api/login',
            data: { 
                username: data.get('username'),
                password: data.get('password')
            }
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate(res.data.redirectUrl)
                }
            })
            .catch((err)=>{
                setMessage('Invalid Credentials.')
                console.log(err);
            })      
    };

  return (
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Box
            sx={{
              m: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

        <Paper elevation={6}>
            <Typography component="h1" variant="h5" sx={{textAlign: 'center', pt: 3}}>
                <FitnessCenterIcon /> Please Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 5 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                autoComplete="username"
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
              {message !== ''
              ? <Typography sx={{color: 'red', fontSize: 12}}>{message}</Typography>
              : null
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
        </Paper>
        </Box>
    </Grid>
  );
}