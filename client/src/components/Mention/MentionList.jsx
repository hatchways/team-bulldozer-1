import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MentionItem from './MentionItem';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  loadingWrapper: {
    width: '100%',
    height: 300,
    marginTop: '10vh',
    textAlign: 'center',
    fontSize: '1rem',
  },
  loading: {
    margin: '0 auto',
  },
}));

const MentionList = ({ isLoading, mentions }) => {
  const classes = useStyles();

  return !isLoading && mentions.length
    ? (
      <ul className={classes.root}>
        { mentions.map((mention, index) => (
          <li key={index} className={classes.item}>
            <MentionItem mention={mention} />
          </li>
        ))}
      </ul>
    )
    : (
      <div className={classes.loadingWrapper}>
        { isLoading
          ? <CircularProgress className={classes.loading} />
          : <div>No mentions were found for your current search criteria.</div>
        }
      </div>
    );
};

MentionList.propTypes = {
  isLoading: PropTypes.bool,
  mentions: PropTypes.array.isRequired,
};

MentionList.defaultProps = {
  isLoading: true,
};

export default MentionList;
