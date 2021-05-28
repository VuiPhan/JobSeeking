import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteAdmin = ({component: Component, ...rest}) => {
    const LoginInfo = useSelector(state => state.loginInfo);
    var IsAccess = false;
    if(LoginInfo.role === "Admin"){
        IsAccess = true;
    }
    return (
        <Route {...rest} render={props => (
            IsAccess ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRouteAdmin;