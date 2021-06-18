import React from 'react';
import PropTypes from 'prop-types';

const Users = props => {
    return (
        <section className="wrapper">
            <div>
                <h2>{props.username}</h2>
            </div>
        </section>
    );
};

Users.propTypes = {
    username: PropTypes.string
};

export default Users;