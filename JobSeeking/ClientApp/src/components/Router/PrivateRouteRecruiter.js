import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteRecruiter = ({component: Component, ...rest}) => {
    const LoginInfo = useSelector(state => state.loginInfo);
    var IsAccess = false;
    if(LoginInfo.role === "Recruiter"){
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

export default PrivateRouteRecruiter;