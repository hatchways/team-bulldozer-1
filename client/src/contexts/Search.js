import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext({});

const SearchProvider = ({ children, value }) => {
  return (
    <SearchContext.Provider value={value}>
      { children }
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.object,
};

SearchProvider.defaultProps = {
  value: {},
};

export { SearchContext, SearchProvider };
