import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import * as NewsAgency from './NewsAgency'


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
}));


function news_agency_logo(news_agency) {
  return '/images/news_agency/' + news_agency + '.png';
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { news, currentId } = props;
  const { idx, title, url, news_agency, summary,  clicked } = news;
  const [liked, setIiked] = useState(false)
  const [loginError, setLoginError] = useState(false)

  useEffect(() => {
    setIiked(!!clicked)
  }, [clicked, idx]);

  const like = () => {
    if(currentId !== "") {
      const id = currentId
      const sign = liked? -1:1
      axios.post('http://localhost:3306/api/news/like', { id, idx, sign })  //링크 바꿔야됨
      .then((response) => {
        setIiked(!liked)
      }).catch((error) => {
  
      })
    } else {
      setLoginError(true)
    }
  }

  const snackBarHandleClose = (event, reason) => {
    setLoginError(false)
  }
  
  return (
    <Card className={classes.root} variant="outlined" display="flex" style={{flex: 1}} >
      <CardHeader 
        className={classes.CardHeader}
        title={
          <Box display="flex" alignItems="center" >
            <Box onClick={() => window.open(NewsAgency.Info[news_agency]?.url)} className={classes.imgBox}>
              <img src={news_agency_logo(news_agency)} alt={news_agency} className={classes.imgLogo} />
            </Box>
            <div style={{ flexGrow: 1 }} />
            <IconButton style={{ padding: "5px" }} onClick={() => like()}>
              <ThumbUpAltIcon color={liked? "primary":"inherit"} style={{ fontSize: "30px" }} />
            </IconButton>
            <Snackbar open={loginError} autoHideDuration={3000} onClose={snackBarHandleClose}>
              <Alert onClose={snackBarHandleClose} severity="error">
                로그인을 해주세요.
              </Alert>
            </Snackbar>
          </Box>
        }
        // <Typography style={{ color: "#000" }}>
        subheader={
          <Box onClick={() => window.open(url)} style={{textDecoration: 'none', cursor:'pointer', paddingBottom:"8px"}}>
            <Typography variant="h6" style={{ color: "#000" }}>
              {title}
            </Typography>
          </Box>
        }
      >
      </CardHeader>
        {/* <Typography color="textSecondary" component="p" style={{fontFamily: "NotoSansKR-Light", whiteSpace: "pre-wrap"}}> */}
      <CardContent onClick={() => window.open(url)} style={{textDecoration: 'none', cursor:'pointer'}}>
        <Typography variant="body2" color="textSecondary" component="p" style={{pointerEvents: "none", userSelect: "none"}}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}