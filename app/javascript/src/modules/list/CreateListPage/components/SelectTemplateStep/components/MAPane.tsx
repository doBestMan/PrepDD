import React from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    invisible: {
      display: 'none',
    },
  })
);

interface MAPaneProps {
  value?: number;
  index?: number;
}

export default function MAPane(props: MAPaneProps) {
  const {value, index} = props;
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="M&A"
      elevation={0}
    >
      <h1>M&A</h1>
    </Paper>
  );
}
