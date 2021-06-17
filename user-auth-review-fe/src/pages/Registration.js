/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const initialFormValues = { username: '', password: '' };

const Registration = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleClick = (event) => {
        event.preventDefault();
        const newUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim()
        };

        if (!newUser.username || !newUser.password) {
            return;
        }

        axios.post('http://localhost:8080/api/auth/register', newUser)
            .then((res) => {
                console.log(res.data.payload);
                setFormValues(initialFormValues);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className='wrapper'>
            <h1>Registration</h1>
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
                    onClick={handleClick}
                >Register</Button>
            </form>
            <div className='switch'>
                <span>Already have an account? <Button color='primary' component={Link} to={'/'}>Login here</Button></span>
            </div>
        </section>
    );
};

export default Registration;
