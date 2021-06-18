/* eslint-disable react/jsx-key */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([]);
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/users', {
                headers: {
                    authorization: token,
                }
            })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <section className="wrapper">
            <div>
                {users.map((user) => {
                    return (<h2>{user.username}</h2>);
                })}
            </div>
        </section>
    );
};

Users.propTypes = {
    username: PropTypes.string
};

export default Users;