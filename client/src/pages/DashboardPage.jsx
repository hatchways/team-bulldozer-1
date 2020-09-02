import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';

import { SearchContext } from '../contexts/Search';
import SearchApi from '../utils/api/SearchApi';

import MentionList from '../components/Mention/MentionList';
import { UserContext } from '../contexts/User';

import consts from '../utils/consts';

const { SOCKET_URL } = consts.env;

const useStyles = makeStyles(() => ({
  root: {
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

let socket;

const DashboardPage = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { search } = useContext(SearchContext);
  const [debouncedSearch] = useDebounce(search, 500);

  const [isLoading, setisLoading] = useState(true);
  const [mentions, setMentions] = useState([]);
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    socket = socketIOClient(SOCKET_URL);

    socket.on('mention', (data) => {
      // Spread operator, wrapper function (recommended)
      setMentions((previous) => [data, ...previous]);
    });

    // Clean up the socket
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!debouncedSearch.length || debouncedSearch.length >= 3) {
      // Emit search event to backend to update our subscribtion
      socket.emit('search', {
        search: debouncedSearch,
        type: sort,
      });
      setisLoading(true);
      SearchApi.search(sort, debouncedSearch)
        .then((response) => {
          setMentions(response.data);
        })
        .catch(() => {
          setMentions([]);
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  }, [debouncedSearch, sort, user]);

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
      <MentionList isLoading={isLoading} mentions={mentions} termToHighlight={debouncedSearch} />
    </main>
  );
};

export default DashboardPage;
