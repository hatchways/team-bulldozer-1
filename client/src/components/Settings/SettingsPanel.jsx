import React from 'react';
import PropTypes from 'prop-types';

const SettingsPanel = ({ children, index, value, ...otherProps }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settingsPanel-${index}`}
    {...otherProps}
  >
    {value === index && (
      <div>
        {children}
      </div>
    )}
  </div>
);

SettingsPanel.propTypes = {
  children: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  otherProps: PropTypes.object,
};

SettingsPanel.defaultProps = {
  otherProps: {},
};

export default SettingsPanel;
