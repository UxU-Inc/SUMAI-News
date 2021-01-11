import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AccountIcon from '@material-ui/icons/AccountCircle';
import MiniDrawer from './MiniDrawer';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import imgLogo from '../../images/sumai_logo_blue.png';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

// import FeedbackDialog from './FeedBackDialog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  hide: {
    display: 'none',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbarLeftIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  imgLogo: {
    width: 80,
    height: 28.2,
    alt: 'SUMAI',
  },
  summaryTypo: {
    color: "#0000008A",
  },
  link: {
    display: 'flex',
    alignItems: "center",
    textDecoration: 'none',
    minWidth: "142px",
  },
}))

export default function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.authentication.status.isLoggedIn)
  
  const [open, setOpen] = React.useState(false);

  const loginButton = (
    <Button className={classes.loginButton} style={matches ? { padding: "7.5px 15px" } : { padding: "5px", minWidth: '80px' }}>
      <AccountIcon style={{ marginRight: "5px", }} />
        로그인
    </Button>
  )
  const loginLayout = (
    <Box display="flex" flexDirection="row" style={{ marginLeft: "auto", color: 'rgba(0, 0, 0, 0.87)' }}>
      <Box p={1}>
      </Box>
    </Box>
  )
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="inherit"
        elevation={0}
      >
        <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          className={clsx(classes.menuButton, {
          })}
        >
          <MenuIcon />
        </IconButton>
          <a href="/" style={{marginTop: 5, marginLeft: 5}} className={classes.link} >
            <img src={imgLogo} alt="SUMAI" className={classes.imgLogo} /> 

            <Typography className={classes.summaryTypo} style={{fontSize: "28px", marginLeft: "10px"}}>
              뉴스 요약
            </Typography>
          </a>

          <div style={{flexGrow: 1}}/>

          {isLoggedIn ? loginLayout : loginButton}

        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
      {/* <FeedbackDialog open={this.state.dialogOpen} setOpen={this.dialogOpen} classes={classes} matches={this.props.matches}/>         */}

      <MiniDrawer open={open} setOpen={setOpen}/>

    </Box>
  )
}