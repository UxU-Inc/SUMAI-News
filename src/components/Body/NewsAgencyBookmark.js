import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as NewsAgencyInfo from './NewsAgencyInfo'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 30px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderLeft: '1px solid rgb(210, 210, 210)',
    borderTop: '1px solid rgb(210, 210, 210)',
    borderBottom: '1px solid rgb(210, 210, 210)',
  },
  gridList: {
    width: "100%",
    backgroundColor: '#ffffff',
  },
  gridListTile: {
    borderRight: '1px solid rgb(210, 210, 210)',
    borderBottom: '1px solid rgb(210, 210, 210)',
  },
  button: {
    width: '100%',
    borderRadius: '0',
  },
  imgLogo: {
    width: '80px',
    height: '40px',
    objectFit: 'scale-down',
  },
}));

function news_agency_logo(news_agency) {
  return '/images/news_agency/' + news_agency + '.png';
}

function news_agency_bookmark_true() {
  return tileData.map((agency) => agency.news_agency);
}

function news_agency_bookmark_false() {
  const allNeswAgency = Object.keys(NewsAgencyInfo.list).map((agency) => agency);
  console.log(allNeswAgency);
  const bookmark_true = news_agency_bookmark_true();
  console.log(bookmark_true);
  const bookmark_false = allNeswAgency.filter(x => !bookmark_true.includes(x)); // 차집합
  console.log(bookmark_false);
  return bookmark_false;
}

export default function NewsAgencyBookmark() {
  const classes = useStyles();
  news_agency_bookmark_false();
  
  return (
    <Box className={classes.root}>
      <Typography style={{marginBottom: '10px'}}>
        즐겨찾기한 언론사
      </Typography>

      <Box className={classes.grid} style={{marginBottom: '50px'}}>
        <GridList cellHeight={50} className={classes.gridList} cols={6}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img} cols={tile.cols || 1} className={classes.gridListTile} style={{padding: '0px'}}>
              <Button className={classes.button} stlye={{padding: '0px'}}>
                <img src={news_agency_logo(tile.news_agency)} alt={tile.title} className={classes.imgLogo} />
              </Button>
            </GridListTile>
          ))}
        </GridList>
      </Box>
      
      
      <Typography style={{marginBottom: '10px'}}>
        즐겨찾기 하지 않은 언론사
      </Typography>

      <Box className={classes.grid}>
        <GridList cellHeight={50} className={classes.gridList} cols={6}>
          {news_agency_bookmark_false().map((newsAgency) => (
            <GridListTile key={newsAgency} cols={1} className={classes.gridListTile} style={{padding: '0px'}}>
              <Button className={classes.button} stlye={{padding: '0px'}}>
                <img src={news_agency_logo(newsAgency)} alt={newsAgency} className={classes.imgLogo} />
              </Button>
            </GridListTile>
          ))}
        </GridList>
      </Box>
    </Box>
  )
}