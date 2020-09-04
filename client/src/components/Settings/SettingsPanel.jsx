import React from 'react';
import PropTypes from 'prop-types';

const SettingsPanel = ({ children, index, value, ...rest }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settingsPanel-${index}`}
    {...rest}
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
  rest: PropTypes.object,
};

SettingsPanel.defaultProps = {
  rest: {},
};

export default SettingsPanel;
