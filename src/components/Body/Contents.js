import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Box from '@material-ui/core/Box';

import NewsAgencyURL from './NewsAgency/NewsAgencyURL'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '260px',
    height: '100%',
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
  avatar: {
    backgroundColor: red[500],
  },
}));


function news_agency_logo(news_agency) {
  return '/images/news_agency/' + news_agency + '.png';
}

function onClickExternLink(news_agency) {
  if(NewsAgencyURL(news_agency) != null) {
    window.location.assign(NewsAgencyURL(news_agency))
  }
}


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { news_agency, title, summary } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        className={classes.CardHeader}
        title={
          <Box display="flex" alignItems="center" >
            <a href={NewsAgencyURL(news_agency)} className={classes.a}>
              <img src={news_agency_logo(news_agency)} alt={news_agency} className={classes.imgLogo} />
            </a>
            <div style={{ flexGrow: 1 }} />
            <IconButton style={{ padding: "5px" }} >
              <ThumbUpAltIcon style={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
        }
        subheader={
          <Typography variant="h6" style={{ color: "#000" }}>
            {title}
          </Typography>
        }
      >

      </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}