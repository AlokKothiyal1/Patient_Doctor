import {  LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload
});

export const loginUserFailure = (payload) => ({
    type: LOGIN_USER_FAILURE,
    payload
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

// doctor Login
export const doctorLogin = (payload) =>dispatch=> {
    console.log("GG")
    const { email, password } = payload;

    axios.post("http://localhost:5000/api/doctor/login",{email:email,password:password})
    .then(res=>{
       dispatch(loginUserSuccess(res.data._id))
    })
    .then(res=><Redirect to="/dashboard"></Redirect>)
    .catch(err=>{
        dispatch(loginUserFailure(err))
    })
};