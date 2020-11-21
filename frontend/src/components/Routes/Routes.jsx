import React from 'react';
import { Route, Switch } from "react-router";
import SignIn from "../Signin";
import SignUp from '../Signup';
import Dashboard from '../Dashboard';
import Details from '../Details'

function Routes(){
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>

            <Route path="/register">
                <SignUp></SignUp>
            </Route>

            <Route  exact path="/dashboard">
                <Dashboard></Dashboard>
            </Route>\
            <Route exact path="/details">
                    <Details></Details>
            </Route>
        </Switch>
)}
export default Routes