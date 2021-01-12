import React from 'react';
import { useHistory } from 'react-router-dom'
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

// import FeedbackDialog from './FeedBackDialog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountManagementMenu from './AccountManagementMenu';

import Menu from './Menu'

import * as root from '../../rootValue';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#ffffff',
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
  },

  loginButton: {
    '&:hover': {
      background: root.HoberColor
    },
    background: root.PrimaryColor,
    color: "#fff",
  },
}))

export default function Header(props) {
  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.up('xsm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.authentication.status.isLoggedIn);

  const { open, setOpen } = props

  const loginButton = (
    <Button onClick={() => window.location.assign("https://sumai.co.kr/login")} className={classes.loginButton} style={md ? { padding: "7.5px 15px" } : { padding: "5px", minWidth: '80px' }}>
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
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
        })}
        position="static"
        color="inherit"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color='#606060'
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={clsx(classes.menuButton, {
            })}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" style={{ marginLeft: 5 }} className={classes.link} style={{minWidth: xsm ? "201px" : "142px"}}>
            <img src={imgLogo} alt="SUMAI" className={classes.imgLogo} />

            <Typography className={classes.summaryTypo} style={{ fontSize: "28px", marginLeft: "10px" }}>
              {xsm ? "뉴스 요약" : "뉴스"}
            </Typography>
          </a>

          <div style={{ flexGrow: 1 }} />

          <Menu/>

          {isLoggedIn ? loginLayout : loginButton}

        </Toolbar>
      </AppBar>
      {/* <FeedbackDialog open={this.state.dialogOpen} setOpen={this.dialogOpen} classes={classes} md={this.props.md}/>         */}

    </Box>
  )
}