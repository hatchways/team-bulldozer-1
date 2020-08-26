import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import MentionList from '../components/Mention/MentionList';

const testMentions = [
  {
    source: 'twitter',
    title: 'Some stuff at Apple',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    thumbnail: 'http://placehold.it/800x600',
    url: 'http://bulldozerinc.com',
  },
  {
    source: 'reddit',
    title: 'Some other stuff at Apple',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    thumbnail: 'http://placehold.it/800x600',
    url: 'http://bulldozerinc.com',
  },
  {
    source: 'twitter',
    title: 'Some more stuff at Apple',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    thumbnail: 'http://placehold.it/800x600',
    url: 'http://bulldozerinc.com',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  const [mentions] = useState(testMentions);
  const [sort, setSort] = useState('recent');

  const handleSortChange = (event, newSort) => {
    if (newSort) {
      setSort(newSort);
    }
  };

  return (
  <main>
    <header className={classes.header}>
      <h1>My Mentions</h1>
      <ToggleButtonGroup color="primary" value={sort} orientation="horizontal" exclusive onChange={handleSortChange}>
        <ToggleButton value="recent" aria-label="recent">
          Most recent
        </ToggleButton>
        <ToggleButton value="popular" aria-label="popular">
          Most popular
        </ToggleButton>
      </ToggleButtonGroup>
    </header>
    <MentionList mentions={mentions} sort={sort} />
  </main>
)};

export default DashboardPage;
