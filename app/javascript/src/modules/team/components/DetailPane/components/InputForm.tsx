import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

import UpdateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: '24px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    input: {
      width: '100%',
      height: '36px',
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 600,
      border: 'none',
      '&::placeholder': {
        color: '#red',
      },
      '&:hover': {
        border: 'none',
      },
      '&:focus': {
        border: 'none',
        outline: 'none',
      },
    },
    nonEditable: {
      display: 'flex',
      height: '36px',
      alignItems: 'center',
    },
    nonEditableInput: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 600,
    },
    nonEditableIcon: {
      marginLeft: '12px',
      color: '#3A84FF',
    },
  })
);

interface InputFormProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate?: () => void;
}

export default function InputForm(props: InputFormProps) {
  const {value, onChange, onUpdate} = props;
  const classes = useStyles();
  const [editable, setEditable] = useState<boolean>(false);

  const handleClickAway = () => {
    if (onUpdate && editable) onUpdate();
    setEditable(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.persist();
    if (event.keyCode === 13) {
      if (onUpdate) onUpdate();
      setEditable(false);
    }
  };

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        {editable ? (
          <input
            type="text"
            className={classes.input}
            value={value}
            onChange={onChange}
            onKeyUp={handleKeyUp}
          />
        ) : (
          <div className={classes.nonEditable}>
            <Typography className={classes.nonEditableInput} variant="h6">
              {value}
            </Typography>
            <UpdateIcon
              className={classes.nonEditableIcon}
              fontSize="small"
              onClick={() => setEditable(true)}
            />
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}
