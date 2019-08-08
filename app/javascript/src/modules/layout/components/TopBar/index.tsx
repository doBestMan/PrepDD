import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'

import Dropdown from './components/Dropdown';
import StyledBadge from './components/StyledBadge';

const drawerWidth = 240
const miniDrawerWidth = 72
const topBarHeight = 73

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: miniDrawerWidth,
      width: `calc(100% - ${miniDrawerWidth}px)`,
      height: topBarHeight,
      background: '#FFFFFF',
      color: '#606060',
      border: '1px solid #D8D8D8',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      height: topBarHeight
    },
    search: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      background: '#F2F2F2',
      borderRadius: '3px',
      fontFamily: 'Helvetica',
      fontWeight: 800, 
      fontSize: '15px'
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      height: 42, 
      fontFamily: 'Helvetica',
      fontSize: '15px',
      fontWeight: 800, 
      color: 'black'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 6),
      transition: theme.transitions.create('width'),
      width: '100%',
      height: 42, 
      [theme.breakpoints.up('md')]: {
        width: 300,
      },
    },
    inviteButton: {
      width: '91px',
      background: '#3A84FF',
      borderRadius: '3px',
      fontFamily: 'Helvetica',
      fontWeight: 800, 
      fontSize: '15px',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    appBarItemSize: {
      width: '40px',
      height: '40px'
    },
    grow: {
      flexGrow: 1
    },
    mr39: {
      marginRight: '39px'
    }    
  })
);

  
export default function TopBar(props: {open: boolean}) {
  const { open } = props;
  const classes = useStyles();

  return (
    <AppBar 
      className={clsx(classes.appBar, open && classes.appBarShift)}
      position="fixed" 
      elevation={0}
    >
      <Toolbar className={classes.toolbar} disableGutters>
        <Dropdown />

        <div className={clsx(classes.search, classes.grow)}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search for lists, request, or files"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{"aria-label": "search"}}
          />
        </div>

        <Typography variant="inherit">
          <Button className={classes.inviteButton}>
            Invite
          </Button>
          <IconButton aria-label="show 4 new notifications" color="inherit">
            <StyledBadge badgeContent={4} color="secondary">
              <NotificationsIcon className={classes.appBarItemSize} />
            </StyledBadge>
          </IconButton>
          <IconButton
            className={classes.mr39}
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle className={classes.appBarItemSize} />
          </IconButton>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
  