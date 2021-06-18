import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component,...rest}) => {
    return (<Route {...rest} render={
        (props) => {
            if(localStorage.getItem('token')){
                return <Component {...props}/>;
            } else {
                return (<Redirect to='/'/>);
            }
        }
    } />);
};

PrivateRoute.propTypes = {
    component: PropTypes.string
};

export default PrivateRoute;