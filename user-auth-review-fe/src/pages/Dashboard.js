import { React, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Users from '../components/Users';

const Dashboard = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            logout();
        }, 600000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="wrapper">
            <h1>Login successful!</h1>
            <div className="card">
                <p>Your session will expire in 10 minutes.</p>
            </div>
            <div className="card">
                <h1>All Users</h1>
                <Users />
            </div>
            <div className="card">
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={logout}
                > Log Out
                </Button>
            </div>
        </section>
    );
};

export default Dashboard;
