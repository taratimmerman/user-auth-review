import { React, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { formSchema } from '../validation/formSchema';
import axiosWithAuth from '../components/axiosWithAuth';

const initialFormValues = {
    username: '',
    password: ''
};

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const handleChange = async event => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
        Yup
            .reach(formSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            })
            .catch((err) => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                });
            });
    };

    const login = (event) => {
        event.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', formValues)
            .then((res) => {
                window.localStorage.setItem('token', res.data.token);
                setFormValues(initialFormValues);
                history.push('/dashboard');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

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
                    error={formErrors?.username}
                    helperText={(formErrors?.username)}
                    maxLength='255'
                    required
                />
                <TextField
                    type='password'
                    name='password'
                    label='Password'
                    variant='outlined'
                    value={formValues.password}
                    onChange={handleChange}
                    error={formErrors?.password}
                    helperText={(formErrors?.password)}
                    maxLength='255'
                    required
                />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={login}
                    disabled={disabled}
                >Log in</Button>
            </form>
            <div className='switch'>
                <span>Need an account? <Button color='primary' component={Link} to={'/registration'} >Register here</Button></span>
            </div>
        </section>
    );
};

export default Login;
