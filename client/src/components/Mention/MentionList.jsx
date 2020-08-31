import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Fade, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

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

const MentionList = ({
  isLoading, mentions, pageSize, termToHighlight,
}) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedMentions, setDisplayedMentions] = useState();

  useEffect(() => {
    setDisplayedMentions(mentions.slice(0, currentPage * pageSize));
  }, [mentions, currentPage, pageSize]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return !isLoading && mentions.length
    ? (
      <ul className={classes.root}>
        <InfiniteScroll
          dataLength={displayedMentions.length}
          pageStart={1}
          next={loadMore}
          hasMore={currentPage * pageSize <= mentions.length}
          loader={<CircularProgress className={classes.loading} />}
        >
          { displayedMentions.map((mention) => (
            <Fade
              key={mention._id}
              in={!isLoading}
              timeout={500}
            >
              <li className={classes.item}>
                <MentionItem mention={mention} termToHighlight={termToHighlight} />
              </li>
            </Fade>
          ))}
        </InfiniteScroll>
      </ul>
    )
    : (
      <div className={classes.loadingWrapper}>
        { isLoading
          ? <CircularProgress className={classes.loading} />
          : <div>No mentions were found for your current search criteria.</div>}
      </div>
    );
};

MentionList.propTypes = {
  isLoading: PropTypes.bool,
  mentions: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  termToHighlight: PropTypes.string,
};

MentionList.defaultProps = {
  isLoading: true,
  pageSize: 10,
  termToHighlight: null,
};

export default MentionList;
