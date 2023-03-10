import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import {StyledTabs, StyledTab} from './styled';
import FilesPane from './FilesPane';

const panelWidth = 539;
const G2Logo = require('images/dummy/logos/g2-logo.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: panelWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: panelWidth,
    },
    drawerSpacer: {
      marginTop: 64,
    },
    drawerHeader: {
      padding: '24px 24px 0px 24px',
    },
    drawerTitle: {
      display: 'flex',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#606060',
      lineHeight: '20px',
    },
    drawerSubTitle: {
      marginRight: '10px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    description: {
      marginTop: '6px',
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 600,
      color: '#606060',
      lineHeight: '20px',
    },
    grow: {
      flexGrow: 1,
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  value: any;
  index: any;
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

export default function ListDetailPage(props: {open: boolean}) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(2);

  const handleChange = (event: unknown, newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerSpacer} />
      <div className={classes.drawerHeader}>
        <div className={classes.drawerTitle}>
          <Typography variant="h2" className={classes.drawerSubTitle}>
            Series B Funding
          </Typography>
          <img src={G2Logo} alt="G2 Crod" />
          <div className={classes.grow} />
          <MoreIcon />
        </div>
        <Typography paragraph className={classes.description}>
          Request by Tom Hardin from G2 Crowd
        </Typography>
      </div>
      <StyledTabs
        value={index}
        onChange={handleChange}
        aria-label="right panel"
      >
        <StyledTab label="overview" />
        <StyledTab label="timeline" />
        <StyledTab label="files" />
        <StyledTab label="messages" />
      </StyledTabs>
      <TabPanel value={index} index={0}>
        Overview
      </TabPanel>
      <TabPanel value={index} index={1}>
        Timeline
      </TabPanel>
      <FilesPane value={index} index={2} />
      <TabPanel value={index} index={3}>
        Messages
      </TabPanel>
    </Drawer>
  );
}
