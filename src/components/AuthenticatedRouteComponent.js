import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { Login } from './LoginComponent';

export const AuthenticatedRoute = ({Component , user , path, ...rest}) => {
    if (user) {
        return (
            <Route path = {path} >
                <Component props = {rest} />
            </Route>
        );
    } else {
        return (
            <Redirect to = "/login" />
        );
    }
}