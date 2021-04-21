import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const LoginInfo = useSelector(state => state.loginInfo);
    var IsAccess = true;
    if(LoginInfo.role === ""){
        IsAccess = false;
    }
    return (
        <Route {...rest} render={props => (
            IsAccess ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;