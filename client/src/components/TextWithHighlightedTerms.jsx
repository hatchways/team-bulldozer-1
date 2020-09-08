import React from 'react';
import PropTypes from 'prop-types';

const TextWithHighlightedTerm = ({ text, term, termClassName }) => {
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return (
    <>
      { parts.map((part, i) => (
        <span key={i} className={part.toLowerCase() === term.toLowerCase() ? termClassName : ''}>
          { part }
        </span>
      ))}
    </>
  );
};

TextWithHighlightedTerm.propTypes = {
  text: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  termClassName: PropTypes.string.isRequired,
};

export default TextWithHighlightedTerm;
