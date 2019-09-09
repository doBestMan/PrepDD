import React, {useState} from 'react';
import clsx from 'clsx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
} from '@material-ui/core';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import ListIcon from '@material-ui/icons/ListAlt';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import RightIcon from '@material-ui/icons/KeyboardArrowRightSharp';

import DefaultUserImage from '../../../../common/DefaultUserImage';
import StyledItem from './components/StyledItem';
import StyledBadge from './components/StyledBadge';

const PANEL_WIDTH = 500;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    paperShift: {
      width: `calc(100% - ${PANEL_WIDTH}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    table: {
      tableLayout: 'fixed', 
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    image: {
      width: '24px', 
      height: '24px', 
      marginRight: '12px', 
      backgroundColor: '#2792A2', 
    },
    unHoverRow: {
      opacity: 0.6, 
    },
    hoverRow: {
      opacity: 1, 
    }, 
    priorityColumn: {
      color: '#509E6D',
    }
  })
);

const data = [
  { name: 'Task Title', status: 'Completed', modified: 'Edited 5 hours ago', priority: 'high' }, 
  { name: 'Task Title', status: 'Delivered', modified: 'Date/Time', priority: 'high' }, 
  { name: 'A longer task', status: 'Finished', modified: 'Date/Time', priority: 'medium' }, 
  { name: 'Task Title', status: 'In Progress', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Not Started', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Rejected', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Not started', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Not started', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Not started', modified: 'Edited 5 hours ago', priority: 'medium' }, 
  { name: 'Task Title', status: 'Not started', modified: 'Edited 5 hours ago', priority: 'medium' }, 
]

interface TaskTableProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskTable(props: TaskTableProps) {
  const {open, setOpen} = props;
  const classes = useStyles();
  const [hover, setHover] = useState<number>(-1);

  const renderOthers = (isSelected: boolean) => {
    return (
      <div className={clsx(classes.flex, isSelected ? classes.hoverRow : classes.unHoverRow)}>
        <DefaultUserImage userName="F" className={classes.image} />
        <StyledBadge variant="dot" color="primary" style={{marginRight: '12px'}}>
          <SmsIcon />
        </StyledBadge>
        <StyledBadge variant="dot" color="primary">
          <ListIcon />
        </StyledBadge>
      </div>
    )
  }

  return (
    <Paper
      className={clsx(classes.paper, open && classes.paperShift)}
      elevation={0}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{width: '20px'}} >
              <ArrowDownIcon />
            </TableCell>
            <TableCell style={{width: '20px'}} >#</TableCell>
            <TableCell>Task</TableCell>
            <TableCell style={{width: '180px'}} >Status</TableCell>
            <TableCell style={{width: '200px'}} >Modified</TableCell>
            <TableCell align="right" style={{width: '150px'}} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item: any, index: number) => {
            const isSelected = hover === index;

            return (
              <TableRow 
                key={index} 
                onClick={() => setOpen(open => !open)}
                onMouseOver={() => setHover(index)}
              >
                <TableCell className={classes.priorityColumn}>
                  {item.priority === 'high' && <RightIcon />}
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <StyledItem status={item.status} selected={isSelected} />
                </TableCell>
                <TableCell>{item.modified}</TableCell>
                <TableCell>{renderOthers(isSelected)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}