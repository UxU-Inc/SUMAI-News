import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import * as NewsAgencyInfo from './NewsAgencyInfo'
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',

    '&::-webkit-scrollbar': {
      width: '0.15em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      outline: '1px solid slategrey'
    },

  },
  CardHeader: {
    borderBottom: '1px solid #e0e0e0',
    color: '#0000008a',
    padding: '8px 8px 0px 16px',
  },
  imgBox: {
    width: '80px',
    height: '40px',
  },
  imgLogo: {
    width: '80px',
    height: '40px',
    objectFit: 'scale-down',
    objectPosition: 'left',
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  font1: {
    fontSize:'12px'
  },
  font2: {
    fontSize:'14px'
  },
  font3: {
    fontSize:'16px'
  },
}));


function news_agency_logo(news_agency) {
  return '/images/news_agency/' + news_agency + '.png';
}

function setHistoryCookie(value) {
  const name = 'history';
  let arr = []
  
  const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  if(cookie) arr = atob(cookie[2]).split(',')
  if(arr.length >= 100) {
    arr.pop()
  }
  if(arr.indexOf(String(value)) === -1) {
    arr.unshift(value)
  }
  arr.sort((a, b) => {
    return b - a;
  })

  document.cookie = name + '=' + btoa(arr.join(',')) + ';path=/;';
}

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { news, currentId, deleteable } = props;
  const { idx, title, url, news_agency, summary, liked_ } = news;
  const [liked, setIiked] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const summaryFontSize = useSelector(store => store.contentSetting.fontSize)

  useEffect(() => {
    setIiked(!!liked_)
  }, [liked_, idx]);

  const like = () => {
    if(currentId !== "-1" && currentId !== "") {
      const id = currentId
      const sign = liked? -1:1
      axios.post('/api/news/like', { id, idx, sign })
      .then((response) => {
        setIiked(!liked)
      }).catch((error) => {
      })
    } else {
      setLoginError(true)
    }
  }
  const click = () => {
    window.open(url)
    if(currentId !== "-1" && currentId !== "") {
      const id = currentId
      axios.post('/api/news/click', { id, idx })
      .then((response) => {
      }).catch((error) => {
      })
    } else if(currentId !== "-1" && currentId === "") {
      setHistoryCookie(idx)
    }
  }
  const requsetDelete = (bool) => {
    if(currentId !== "-1" && currentId !== "") {
      setDeleteCheck(bool)
      setDeleted(bool)
    }
  }
  
  const handleLoginErrorClose = (event, reason) => {
    setLoginError(false)
  }

  const handleDeleteCheckClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if(deleteCheck) {
      const id = currentId
      axios.post('/api/news/delete', { id, idx })
      .then((response) => {
      }).catch((error) => {
      })
    }
    setDeleteCheck(false)
  }
  
  return (<>
    <Card className={classes.root} variant="outlined" display="flex" style={deleted? {display:"none"}:{flex: 1}} >
      <CardHeader 
        className={classes.CardHeader}
        title={
          <Box display="flex" alignItems="center" >
            <Box onClick={() => window.open(NewsAgencyInfo.list[news_agency]?.url)} className={classes.imgBox}>
              <img src={news_agency_logo(news_agency)} alt={news_agency} className={classes.imgLogo} onError={e => e.target.style.display='none'} />
            </Box>
            <div style={{ flexGrow: 1 }} />
            {deleteable?
              <IconButton style={{ padding: "5px" }} onClick={() => requsetDelete(true)}>
                <DeleteIcon style={{ fontSize: "30px" }} />
              </IconButton>
            : null}
            <IconButton style={{ padding: "5px" }} onClick={() => like()}>
              <ThumbUpAltIcon color={liked? "primary":"inherit"} style={{ fontSize: "30px" }} />
            </IconButton>
            <Snackbar open={loginError} autoHideDuration={3000} onClose={handleLoginErrorClose}>
              <Alert onClose={handleLoginErrorClose} severity="error" variant="filled">
                로그인이 필요한 서비스입니다.
              </Alert>
            </Snackbar>
          </Box>
        }
        subheader={
          <Box onClick={() => click()} style={{textDecoration: 'none', cursor:'pointer', paddingBottom:"8px"}}>
            <Typography variant="h6" style={{ color: "#000" }}>
              {title}
            </Typography>
          </Box>
        }
      >
      </CardHeader>
      <CardContent onClick={() => click()} style={{textDecoration: 'none', cursor:'pointer'}}>
        <Typography variant="body2" color="textSecondary" component="p" style={{pointerEvents: "none", userSelect: "none", fontSize: summaryFontSize+"px"}}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
    <Snackbar open={deleteCheck} autoHideDuration={3000} onClose={handleDeleteCheckClose}>
      <Alert severity="success" variant="filled"
        action={<Button onClick={() => requsetDelete(false)} color="inherit" size="small">
          삭제 취소
        </Button>}>
        기록이 삭제되었습니다
      </Alert>
    </Snackbar>
  </>);
}