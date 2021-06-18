import { React, useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { formSchema } from '../validation/formSchema';

const initialFormValues = {
    username: '',
    password: ''
};

const Registration = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState('');
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
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

    const handleClick = (event) => {
        event.preventDefault();
        const newUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim()
        };

        axios.post('http://localhost:8080/api/auth/register', newUser)
            .then((res) => {
                console.log(res.data);
                setFormValues(initialFormValues);
                history.push('/');
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

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
                    onClick={handleClick}
                    disabled={disabled}
                >Register</Button>
            </form>
            <div className='switch'>
                <span>Already have an account? <Button color='primary' component={Link} to={'/'}>Login here</Button></span>
            </div>
        </section>
    );
};

export default Registration;
