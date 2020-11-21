import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {doctorLogin} from '../Redux/login/actions'

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
    width: '100%', 
    marginTop: theme.spacing(1),
    height:"55vh"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignIn() {
  const classes = useStyles();

  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [errMsg,setErrMsg] = useState('')
  
  const history = useHistory()
  const dispatch = useDispatch()

  let isAuth = useSelector((state)=>state.auth.isAuth)

  console.log(isAuth)
  if(isAuth){
    history.push('/dashboard')
  }

  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          {errMsg!==""?<h5 style={{color:"red",lineHeight:0}}>{errMsg}</h5>:null}
          <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick ={()=>dispatch(doctorLogin({email,password}))}
          className={classes.submit}
          >
          Sign In
          </Button>         

          <Box component={Grid} container className={classes.bottom}>
            <Box component={Grid} item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    </Container>
  );
}