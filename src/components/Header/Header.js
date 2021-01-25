import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AccountIcon from '@material-ui/icons/AccountCircle';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import imgLogo from '../../images/sumai_logo_blue.png';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountManagementMenu from './AccountManagementMenu';

import Menu from './Menu'

import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';

import * as root from '../../rootValue';
import ControllerMenu from './Controller/ControllerMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '64px',
    [theme.breakpoints.between(0, 600)]: {
      height: '56px',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#ffffff',
    [theme.breakpoints.between(0, 600)]: {
      height: '56px',
    },
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
    marginLeft: '25px',
    [theme.breakpoints.between(0, 640)]: {
      marginLeft: '13px',
    },
  },

  loginButton: {
    '&:hover': {
      background: root.HoberColor
    },
    background: root.PrimaryColor,
    color: "#fff",
  },
}))


function setCautionCookie() {
  const name = 'caution';
  const value = true;
  const expires = new Date()
  expires.setTime(expires.setHours(24, 0, 0, 0));

  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;';
}

function getCautionCookie() {
  const name = 'caution';
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};


export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const w_365 = useMediaQuery(theme.breakpoints.up(365));
  const w_420 = useMediaQuery(theme.breakpoints.up(420));
  const w_480 = useMediaQuery(theme.breakpoints.up(480));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const isLoggedIn = useSelector(state => state.authentication.status.isLoggedIn);
  const [snackOpen, setSnackOpen] = useState(true)

  const { open, setOpen } = props

  const loginButton = (
    <Button onClick={() => window.location.assign("https://sumai.co.kr/login?url=" + window.location.href)} className={classes.loginButton} style={md ? { padding: "7.5px 15px" } : { padding: "5px", minWidth: '80px' }}>
      <AccountIcon style={{ marginRight: "5px", }} />
        로그인
    </Button>
  )
  const loginLayout = (
    <Box display="flex" flexDirection="row" style={{ marginLeft: "auto", color: 'rgba(0, 0, 0, 0.87)' }}>
      <Box p={1}>
        {AccountManagementMenu()}
      </Box>
    </Box>
  )
  const snackBarHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false)

    setCautionCookie()
  }
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
        })}
        position="fixed"
        color="inherit"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color='default'
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={clsx(classes.menuButton, {
            })}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" className={classes.link} style={{ minWidth: w_480 ? "211px" : "152px" }}>
            <img src={imgLogo} alt="SUMAI" className={classes.imgLogo} />

            <Typography className={classes.summaryTypo} style={{ fontSize: "28px", margin: "0px 10px" }}>
              {w_480 ? "뉴스 요약" : "뉴스"}
            </Typography>
          </a>

          <div style={{ flexGrow: 1 }} />

          {w_420 ? <ControllerMenu /> : <span />}

          {w_365 ? <Menu /> : <div style={{ marginLeft: '10px' }} />}

          {isLoggedIn ? loginLayout : loginButton}

        </Toolbar>
      </AppBar>

      {
        getCautionCookie() === null &&
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackOpen}
          autoHideDuration={5000}
          onClose={snackBarHandleClose}
        >
          <Alert onClose={snackBarHandleClose} severity="warning" variant="filled">
            <AlertTitle>잘못된 요약문이 생성될 수 있습니다. </AlertTitle>
            정확한 내용을 살펴보려면 원문 내용을 직접 읽어보세요.
          </Alert>
        </Snackbar>
      }

    </Box>
  )
}