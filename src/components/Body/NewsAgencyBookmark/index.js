import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Backdrop, CircularProgress, Paper } from '@material-ui/core';
import { useStyles, useBookmark, useItemCount } from './Hook';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from 'react-redux';


function news_agency_logo(news_agency) {
  return '/images/news_agency/' + news_agency + '.png';
}

function Item(props) {
  const {list, classes, onClick} = props

  return(
    list.map((item) => (
      <Box key={item} className={classes.gridListTile}>
        <Button className={classes.button} stlye={{padding: '0px'}} onClick={onClick}>
          <img src={news_agency_logo(item)} alt={item} className={classes.imgLogo}/>
        </Button>
      </Box>
    ))
  )
}

function EmptyItem(props) {
  const {list, columns, className} = props

  return (
    Array.from({length: (columns - list.length % columns) % columns, undefined}).map(() => (
        <Box className={className} />
    ))
  )
}

export default function NewsAgencyBookmark() {
  const classes = useStyles();
  const [bookmark, nonBookmark, changeBookmark, loading] = useBookmark()
  const [itemCount, flexElement] = useItemCount()
  
  return (
    <Box className={classes.root}>
      <Typography style={{marginBottom: '10px'}}>
        즐겨찾기한 언론사
      </Typography>
      <Box className={classes.grid} style={{marginBottom: '50px'}}>
        <Box ref={flexElement} className={classes.gridList} >
          <Item list={bookmark} 
            classes={{gridListTile:classes.gridListTile, button:classes.button, imgLogo:classes.imgLogo}}
            onClick={(event) => changeBookmark(event, false)}
          />
          <EmptyItem list={bookmark} columns={itemCount} className={classes.gridListTile}/>
        </Box>
      </Box>

      <Typography style={{marginBottom: '10px'}}>
        즐겨찾기 하지 않은 언론사
      </Typography>
      <Box className={classes.grid}>
        <Box className={classes.gridList} >
          <Item list={nonBookmark}
            classes={{gridListTile:classes.gridListTile, button:classes.button, imgLogo:classes.imgLogo}}
            onClick={(event) => changeBookmark(event, true)}
          />
          <EmptyItem list={nonBookmark} columns={itemCount} className={classes.gridListTile}/>
        </Box>
      </Box>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}