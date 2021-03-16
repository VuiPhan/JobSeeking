import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteForViewList = ({component: Component, ...rest}) => {
    // Khi nào thì được hiện?
    // Khi mà người đăng nhập là người tuyển dụng của công việc đó
    // Đi đến trang hồ sơ nhân viên 
    const IsAccess = useSelector(state => state.JobKendo);
    const LoginInfo = useSelector(state => state.loginInfo);
    return (
        <Route {...rest} render={props => (
            IsAccess.IsAccess && LoginInfo.companyID?
                <Component {...props} />
            : ""
        )} />
    );
};

export default PrivateRouteForViewList;