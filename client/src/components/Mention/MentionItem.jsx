import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import consts from '../../utils/consts';

import TextWithHighlightedTerm from '../TextWithHighlightedTerms';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    boxShadow: '0px 0px 20px 0px rgba(215,219,237,0.3)',
    textDecoration: 'none',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  image: {
    width: '100%',
    height: 200,
    maxWidth: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: 150,
      flex: '0 0 150px',
    },
  },
  content: {
    marginLeft: theme.spacing(2),
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  source: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.gray.medium,
    fontSize: '.9rem',
  },
  body: {
    color: theme.palette.gray.dark,
    fontSize: '.9rem',
    lineHeight: 1.5,
  },
  highlighted: {
    color: theme.palette.primary.main,
  },
}));

const MentionItem = ({ mention, termToHighlight }) => {
  const classes = useStyles();
  const { CRAWLERS } = consts;
  const {
    body, source, title, thumbnail, url,
  } = mention;

  return (
    <a className={classes.root} href={url} target="_blank" rel="noopener noreferrer">
      <img className={classes.image} src={thumbnail} alt={`Thumbnail for mention ${title}`} />
      <div className={classes.content}>
        <h3 className={classes.title}>
          {!!title
          && (
            <TextWithHighlightedTerm
              text={title}
              term={termToHighlight}
              termClassName={classes.highlighted}
            />
          )}
        </h3>
        <div className={classes.source}>
          {CRAWLERS.find((crawler) => crawler.name === source).label}
        </div>
        <p className={classes.body}>
          {!!body
          && (
            <TextWithHighlightedTerm
              text={body}
              term={termToHighlight}
              termClassName={classes.highlighted}
            />
          )}
        </p>
      </div>
    </a>
  );
};

MentionItem.propTypes = {
  mention: PropTypes.object.isRequired,
  termToHighlight: PropTypes.string,
};

MentionItem.defaultProps = {
  termToHighlight: null,
};

export default MentionItem;
