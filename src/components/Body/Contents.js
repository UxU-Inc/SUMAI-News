import React, { useState } from 'react';
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
    padding: '8px 8px 8px 16px',
  },
  a: {
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


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { news_agency, title, summary, idx, currentId } = props;
  const [liked, setIiked] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const like = () => {
    if(currentId !== "") {
      axios.post('http://localhost:3306/api/news/like', { currentId, idx })
      .then((response) => {
        setIiked(!liked)
        console.log("a")
      }).catch((error) => {
  
      })
    } else {
      setLoginError(true)
    }
  }

  return (
    <Card className={classes.root} variant="outlined" display="flex" style={{flex: 1}} >
      <CardHeader 
        className={classes.CardHeader}
        title={
          <Box display="flex" alignItems="center" >
            <a href={NewsAgency.Info[news_agency]?.url} className={classes.a}>
              <img src={news_agency_logo(news_agency)} alt={news_agency} className={classes.imgLogo} />
            </a>
            <div style={{ flexGrow: 1 }} />
            <IconButton style={{ padding: "5px" }} >
              <ThumbUpAltIcon onClick={() => like()} color={liked? "primary":"inherit"} style={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
        }
        subheader={
          <Typography style={{color: "#000"}}>
            {title}
          </Typography>
        }
      >
      </CardHeader>
      <CardContent>
        <Typography color="textSecondary" component="p" style={{fontFamily: "NotoSansKR-Light", whiteSpace: "pre-wrap"}}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}