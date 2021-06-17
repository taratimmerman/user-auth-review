import { React, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialFormValues = {
    username: '',
    password: ''
};

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const login = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/auth/login', formValues)
            .then((res) => {
                window.localStorage.setItem('token', res.data.token);
                setFormValues(initialFormValues);
                history.push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className='wrapper'>
            <h1>Login</h1>
            <form className='card'>
                <TextField
                    type='text'
                    name='username'
                    label='Username'
                    variant='outlined'
                    value={formValues.username}
                    onChange={handleChange}
                    maxLength='255'
                />
                <TextField
                    type='password'
                    name='password'
                    label='Password'
                    variant='outlined'
                    value={formValues.password}
                    onChange={handleChange}
                    maxLength='255'
                />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={login}
                >Log in</Button>
            </form>
            <div className='switch'>
                <span>Need an account? <Button color='primary' component={Link} to={'/registration'}>Register here</Button></span>
            </div>
        </section>
    );
};

export default Login;
