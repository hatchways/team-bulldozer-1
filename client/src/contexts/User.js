import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext({});

const UserProvider = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.object,
};

UserProvider.defaultProps = {
  value: {},
};

export { UserContext, UserProvider };
