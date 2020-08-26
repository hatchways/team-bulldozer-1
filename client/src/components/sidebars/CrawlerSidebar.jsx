import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import consts from '../../utils/consts';
import { UserContext } from '../../contexts/User';
import AuthApi from '../../utils/api/AuthApi'

import CrawlerSwitch from '../CrawlerSwitch';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${theme.palette.gray.main}`,
    '&:last-child': {
      borderBottom: 0,
    },
  },
}));

const CrawlerSidebar = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { CRAWLERS } = consts;

  const initialCrawlers = {};
  CRAWLERS.forEach((crawler) => {
    initialCrawlers[crawler.name] = user.crawlers.includes(crawler.name);
  });
  const [crawlers, setProviders] = useState(initialCrawlers);

  const handleProviderChange = (crawler, checked) => {
    const newCrawlers = { ...crawlers, [crawler]: checked };
    setProviders(newCrawlers);
    AuthApi.setProfileInfo({
      crawlers: Object.keys(newCrawlers).filter((crawlerName) => newCrawlers[crawlerName]),
    });
  };

  return (
    <div className={classes.root}>
      { CRAWLERS.map((crawler) => (
        <div className={classes.item} key={crawler.name}>
          <CrawlerSwitch
            crawler={crawler}
            checked={crawlers[crawler.name]}
            onChange={(event, checked) => handleProviderChange(crawler.name, checked)}
          />
        </div>
      )) }
    </div>
  );
};

export default CrawlerSidebar;
