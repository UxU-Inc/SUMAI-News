import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import * as root from '../../rootValue';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// import html2canvas from 'html2canvas';
// import emailjs from 'emailjs-com';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  FeedbackDialogRoot: {
    justifyContent: 'center',
    margin: '0 auto',
  },
  
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.25),
    top: theme.spacing(0.25),
    color: 'white',
  },
  FeedbackDialogContent: {
    display: 'flex',
    padding: "10px 5px 10px 10px",

  },
  FeedbackDialogTextArea: {
    '&::-webkit-scrollbar': {
      width: '0.2em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      outline: '1px solid slategrey'
    },
  },
})
)

function FeedbackDialogSnackbar(props) {
  const { open, setOpen, state } = props
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  }

  const SnackbarAlert = React.useCallback(() => {
    if (state === 200) return (
      <MuiAlert elevation={6} variant="filled" severity={"success"}>
        소중한 의견 감사합니다.
      </MuiAlert>
    )
    else return (
      <MuiAlert elevation={6} variant="filled" severity={"error"}>
        죄송합니다. 의견 보내기를 실패했습니다.
      </MuiAlert>
    )
  }, [state])

  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
      <SnackbarAlert />
    </Snackbar>
  )
}

export default function FeedbackDialog(props) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { open, setOpen } = props
  const [message, setMessage] = React.useState('')

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [emailSendButton, setEmailSendButton] = React.useState(true)
  const [emailSendState, setEmailSendState] = React.useState(null)

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }
  function sendEmail(e) {
    setEmailSendButton(false)
    e.preventDefault();

    axios.post('/api/Email/sendEmail', { message: message }).then((res) => { // email을 추가하려면 {massage: message, email: 변수}
      setEmailSendState(res.status)
      setSnackbarOpen(true)
    }, (res) => {
      setEmailSendButton(true)
      setEmailSendState(res.status)
      setSnackbarOpen(true)
    });
    handleClose()
  }

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    setEmailSendButton(true);
  };

  return (
    <Box>
      <Dialog id='feedback' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullScreen={!matches}
        style={matches ? { width: '460px', } : {}} className={classes.FeedbackDialogRoot}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ backgroundColor: root.PrimaryColor, color: 'white', padding: "10px 15px" }}>
          의견 보내기
        </DialogTitle>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Box className={classes.FeedbackDialogContent} style={matches ? { minHeight: '200px', maxHeight: '250px' } : { height: '100%' }}>
          <TextareaAutosize className={classes.FeedbackDialogTextArea} maxLength="5000" autoFocus={true} onChange={handleMessage}
            placeholder="의견을 보내고 싶으신가요? 보내 주신 의견은 소중하게 활용되지만, 민감한 정보는 공유하지 말아 주세요. 궁금하신 점이 있나요? 지원팀에 문의해 보세요."
            style={{
              boxSizing: "border-box",
              flexGrow: 1,
              width: '100%',
              height: 'auto',
              resize: 'none',
              border: 'none',
              outline: 'none',
              font: "400 16px NotoSansKR-Regular",
              overflow: "visible"
            }} />
        </Box>
        <Box style={{ display: 'block', background: 'WhiteSmoke', padding: '0' }}>
          <Box style={{ display: 'flex' }}>
            <img id="screenshotPreview" src='' alt='' style={{ marginLeft: 'auto', marginRight: 'auto', }} />
          </Box>
        </Box>
        <small
          style={{
            borderTop: '1px solid rgb(224, 224, 224)',
            color: 'rgb(168, 168, 168)',
            backgroundColor: 'rgb(250, 250, 250)',
            font: "12px NotoSansKR-Regular",
            padding: "15px 15px"
          }}>
          일부 계정 및 시스템 정보가 SUMAI에 전송될 수 있습니다.
          제공해 주신 정보는 개인정보처리방침 및 서비스 약관에 따라 기술 문제를 해결하고 서비스를 개선하는 데 사용됩니다.
          </small>
        <DialogActions
          style={{ borderTop: '1px solid rgb(224, 224, 224)', backgroundColor: 'rgb(250, 250, 250)', padding: '5px 15px' }}>
          <Button id='emailSendButton' autoFocus color="primary" style={{ font: "16px NotoSansKR-Regular", }} onClick={sendEmail} disabled={!emailSendButton}>
            보내기
            </Button>
        </DialogActions>
      </Dialog>
      <FeedbackDialogSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} state={emailSendState} />
    </Box>
  )
}