import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import * as root from '../rootValue';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      minHeight: theme.spacing(40),
    },
  },
  cardLayout: {
    display: 'table-cell',
    position: 'relative',
    verticalAlign: 'top',
    width: '50%',
  },
  cardTitleText: {
    borderBottom: '1px solid #e0e0e0',
    color: '#0000008a',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  textInput: {
    background: '#ffffff',
    width: '100%',
    height: '100%',
    lineHeight: '35px',
    minHeight: theme.spacing(20),
    fontSize: '24px',
    fontFamily: 'NotoSansKR-Regular',
    border: 'none',
    outline: 'none',
    resize: 'none',
  },
  textLimit: {
    color: "#787878",
    textAlign: "right",
  },
  textLimitAccent: {
    color: "#ED1C24",
    textAlign: "right",
  },
  summaryLayout: {
    minHeight: theme.spacing(30.15),
    fontSize: '24px',
    lineHeight: '35px',
    color: "#424242"
  },
  summaryButtonLayout: {
    padding: theme.spacing(0),
  },
  summaryButton: {
    variant: 'contained',
    color: '#ffffff',
    background: root.PrimaryColor,
    "&:hover": {
      background: root.HoberColor
    },
    width: '100%',
    height: '50px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '0px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    margin: theme.spacing(0),
  },
  displayNone: {
    display: "none",
  },
  fab: {
    background: "#fff",
    color: "#00000080",
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    zIndex: "1",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  tooltip: {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontFamily: "NotoSansKR-Regular"
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function Body() {
  const classes = useStyles();
  return (
    <Box style={{color: "#000", padding: "75px 0px"}}>
      바디임
    </Box>
  )
}