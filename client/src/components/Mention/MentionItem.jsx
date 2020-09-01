import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';

import consts from '../../utils/consts';

import TextWithHighlightedTerm from '../TextWithHighlightedTerms';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
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
    marginBottom: theme.spacing(2),
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: 150,
      flex: '0 0 150px',
      marginBottom: 0,
    },
  },
  content: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      position: 'relative',
    },
  },
  title: {
    margin: 0,
    paddingRight: 32,
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
    lineBreak: 'anywhere',
  },
  highlighted: {
    color: theme.palette.primary.main,
  },
  sentiment: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      top: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },
  },
  sentimentIcon: {
    width: 24,
    height: 24,
    fill: theme.palette.primary.main,
  },
}));

const MentionItem = ({ mention, termToHighlight }) => {
  const classes = useStyles();
  const { CRAWLERS } = consts;
  const {
    body, source, title, thumbnail, url, meta,
  } = mention;
  let sentimentIcon;

  switch (meta.emotion) {
    case 'good':
      sentimentIcon = <SentimentVerySatisfied className={classes.sentimentIcon} titleAccess="Good sentiment" />;
      break;
    case 'neutral':
      sentimentIcon = <SentimentSatisfied className={classes.sentimentIcon} titleAccess="Neutral sentiment" />;
      break;
    case 'bad':
      sentimentIcon = <SentimentVeryDissatisfied className={classes.sentimentIcon} titleAccess="Bad sentiment" />;
      break;
    default:
      sentimentIcon = null;
  }

  return (
    <a className={classes.root} href={url} target="_blank" rel="noopener noreferrer">
      <img className={classes.image} src={thumbnail} alt={`Thumbnail for mention ${title}`} />
      <div className={classes.content}>
        {!!title && (
          <h3 className={classes.title}>
            {termToHighlight
              ? (
                <TextWithHighlightedTerm
                  text={title}
                  term={termToHighlight}
                  termClassName={classes.highlighted}
                />
              )
              : title }
          </h3>
        )}
        <div className={classes.source}>
          {CRAWLERS.find((crawler) => crawler.name === source).label}
        </div>
        {!!body && (
          <p className={classes.body}>
            {termToHighlight
              ? (
                <TextWithHighlightedTerm
                  text={body}
                  term={termToHighlight}
                  termClassName={classes.highlighted}
                />
              )
              : body }
          </p>
        )}
        {!!sentimentIcon && (
          <div className={classes.sentiment}>
            { sentimentIcon }
          </div>
        )}
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
