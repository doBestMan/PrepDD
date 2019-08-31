import React from 'react';
import clsx from 'clsx';
import {
  Theme,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {useMediaQuery} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

import {useGlobalState} from '../../../../store';
import DefaultUserImage from '../../../../components/DefaultUserImage';
import Dropdown from './components/Dropdown';
import StyledBadge from './components/StyledBadge';

const drawerWidth = 210;
const miniDrawerWidth = 72;
const topBarHeight = 64;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: miniDrawerWidth,
      width: `calc(100% - ${miniDrawerWidth + 1}px)`,
      height: topBarHeight,
      background: '#FFFFFF',
      color: '#606060',
      borderBottom: '1px solid #D8D8D8',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
      height: topBarHeight,
    },
    search: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      height: '36px',
      background: '#F2F2F2',
      borderRadius: '3px',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
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
      width: '100%',
      height: 33,
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'black',
    },
    inputInput: {
      padding: '10px 8px 8px 48px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 300,
      },
    },
    inviteButton: {
      width: '72px',
      height: '36px',
    },
    appBarItemSize: {
      width: '32px',
      height: '32px',
    },
    roundImage: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
    },
    grow: {
      flexGrow: 1,
    },
    mr39: {
      marginRight: '39px',
    },
  })
);

export default function TopBar(props: {open: boolean}) {
  const {open} = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const {state, dispatch} = useGlobalState();

  return (
    <AppBar
      className={clsx(classes.appBar, open && classes.appBarShift)}
      position="fixed"
      elevation={0}
    >
      <Toolbar className={classes.toolbar} disableGutters>
        <Dropdown />

        {isDesktop ? (
          <div className={clsx(classes.search, classes.grow)}>
            <div className={classes.searchIcon}>
              <SearchIcon fontSize="small" />
            </div>
            <InputBase
              placeholder="Search for lists, request, or files"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
        ) : (
          <div className={classes.grow} />
        )}

        <Typography variant="inherit">
          <Button className={classes.inviteButton}>Invite</Button>
          <IconButton
            aria-label="show 4 new notifications"
            color="inherit"
            style={{marginLeft: '6px'}}
          >
            <StyledBadge badgeContent={4} color="secondary">
              <NotificationsIcon className={classes.appBarItemSize} />
            </StyledBadge>
          </IconButton>
          <IconButton
            className={classes.mr39}
            aria-label="account of current user"
            color="inherit"
          >
            {state.currentUser.profileUrl ? (
              <img
                src={state.currentUser.profileUrl}
                className={classes.roundImage}
              />
            ) : (
              <DefaultUserImage userName={state.currentUser.fullName} />
            )}
          </IconButton>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
