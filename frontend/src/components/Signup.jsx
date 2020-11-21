import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios'
import {Link,useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignUp() {
  const classes = useStyles();
  
  const history = useHistory()
  let [name,setName] = useState('')
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [errMsg,setErrMsg] = useState('')
  
  const handleSubmit  = ()=>{
     axios.post("http://localhost:5000/api/doctor/register",{email:email,password:password,name:name})
     .then(res=>history.push('/'))
     .catch(err=>{setErrMsg(err.response.data)})
  }

  return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            autoFocus
            type="text"
            id="name"
            value ={name}
            onChange ={(e)=>setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value = {email}
            onChange ={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value ={password}
            onChange ={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick ={handleSubmit}
            className={classes.submit}
          >
            Sign Up
          </Button>
          {errMsg!==""?<h6 style={{color:"red",lineHeight:0}}>{errMsg}</h6>:null}
          <Box component={Grid} container className={classes.bottom}>
            <Box component={Grid} item>
              <Link to="/">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    </Container>
  );
}