import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SettingsTextField from './SettingsTextField';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  item: {
    position: 'relative',
    marginBottom: theme.spacing(1),
  },
  button: {
    position: 'absolute',
    top: 'calc(50% - 18px)',
    right: theme.spacing(1),
    width: 105,
    height: 35,
    padding: theme.spacing(0, 3),
    fontSize: '.75rem',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  buttonRemove: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
    },
  },
}));

const SettingsListField = ({ value, onItemsChange, placeholder }) => {
  const classes = useStyles();
  const [items, setItems] = useState(value);
  const [newItem, setNewItem] = useState('');

  const updateItems = useRef(onItemsChange);
  useEffect(() => {
    updateItems.current(items);
  } , [items, updateItems]);

  const handleItemAdd = (itemToAdd) => {
    if (itemToAdd && itemToAdd.length) {
      setItems((previousItems) => [...previousItems, itemToAdd]);
      setNewItem('');
    }
  };

  const handleItemRemove = (itemToRemove) => {
    setItems((previousItems) => previousItems.filter((item) => item !== itemToRemove));
  };

  const handleItemChange = (index, newValue) => {
    const newItems = [...items];
    newItems[index] = newValue;
    setItems(newItems);
  };

  return (
    <div className={classes.root}>
      {items.map((item, index) => (
        <div className={classes.item}>
          <SettingsTextField
            className={classes.field}
            placeholder={placeholder}
            value={item}
            onChange={(event) => handleItemChange(index, event.target.value)}
          />
          <Button
            className={`${classes.button} ${classes.buttonRemove}`}
            variant="contained"
            disabled={items.length <= 1}
            onClick={() => handleItemRemove(item)}
          >
            Remove
          </Button>
        </div>
      ))}
      <div className={classes.item}>
        <SettingsTextField
          className={classes.field}
          value={newItem}
          placeholder={placeholder}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => handleItemAdd(newItem)}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

SettingsListField.propTypes = {
  onItemsChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.array.isRequired,
};

SettingsListField.defaultProps = {
  onItemsChange: () => {},
  placeholder: '',
};

export default SettingsListField;
