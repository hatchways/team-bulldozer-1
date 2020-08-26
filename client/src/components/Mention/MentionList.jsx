import React from 'react';
import PropTypes from 'prop-types';

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
}));

const MentionList = ({ mentions }) => {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      { mentions.map((mention) => (
        <li className={classes.item}>
          <MentionItem mention={mention} />
        </li>
      ))}
    </ul>
  );
};

MentionList.propTypes = {
  mentions: PropTypes.array.isRequired,
};

export default MentionList;
