import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import consts from '../../utils/consts';
import { UserContext } from '../../contexts/User';
import AuthApi from '../../utils/api/AuthApi'

import ProviderSwitch from '../ProviderSwitch';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E9EDFA',
    '&:last-child': {
      borderBottom: 0,
    },
  },
}));

const ProviderSidebar = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { PROVIDERS } = consts;

  const initialProviders = {};
  PROVIDERS.forEach((provider) => {
    initialProviders[provider.name] = user.crawlers.includes(provider.name);
  });

  const [providers, setProviders] = useState(initialProviders);

  const handleProviderChange = (provider, checked) => {
    const newProviders = { ...providers, [provider]: checked };
    setProviders(newProviders);
    AuthApi.setProfileInfo({
      crawlers: Object.keys(newProviders).filter((providerName) => newProviders[providerName]),
    });
  };

  return (
    <div className={classes.root}>
      { PROVIDERS.map((provider) => (
        <div className={classes.item} key={provider.name}>
          <ProviderSwitch
            provider={provider}
            checked={providers[provider.name]}
            onChange={(event, checked) => handleProviderChange(provider.name, checked)}
          />
        </div>
      )) }
    </div>
  );
};

export default ProviderSidebar;
