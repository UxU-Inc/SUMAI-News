import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';

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
  },
  gridList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    borderTop: '1px solid rgb(210, 210, 210)',
    borderLeft: '1px solid rgb(210, 210, 210)',
    backgroundColor: '#ffffff',
  },
  gridListTile: {
    flex: '1 0 20%',
    
    // borderTop: '1px solid rgb(210, 210, 210)',
    // borderLeft: '1px solid rgb(210, 210, 210)',
    borderBottom: '1px solid rgb(210, 210, 210)',
    borderRight: '1px solid rgb(210, 210, 210)',
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

async function requestBookmark() {
  return axios('/api/bookmark/').then((data) => {
    return data.data
  }).catch((err) => {
    // 실패
  })
}

function useBookmark() {
  const [allNewsAgency, setAllNewsAgency] = React.useState(Object.keys(NewsAgencyInfo.list).map((agency) => agency));
  const [bookmark, setBookmark] = React.useState([])
  const nonBookmark = allNewsAgency.filter(x => !bookmark.includes(x))

  React.useEffect(() => {
    requestBookmark().then((data) => {
      setBookmark(data)
    })

  },[])

  const changeBookmark = (event, bool) => {
    console.log(event.target.alt)
    if(typeof(event.target.alt) !== "undefined") {
      if(bool === true) {
        axios.post('/api/bookmark/add', {bookmark: event.target.alt}).then(() => {
          setBookmark([...bookmark, event.target.alt]) // 추가
        })
      } else {
        axios.post('/api/bookmark/delete', {bookmark: event.target.alt}).then(() => {
          bookmark.splice(bookmark.indexOf(event.target.alt),1)
          setBookmark([...bookmark])
        })
      }
    }
    // axios.post('',).then((res) => {
    //   setBookmark()
    //   // 성공
    // }).catch((err) => {
    //   // 실패
    // })
  }

  return [bookmark, nonBookmark, changeBookmark]
}

export default function NewsAgencyBookmark() {
  const classes = useStyles();
  const [bookmark, nonBookmark, changeBookmark] = useBookmark()
  
  return (
    <Box className={classes.root}>
      <Box display='flex'>
        <BookmarkIcon color='primary' style={{marginRight: '5px'}}/>
        <Typography style={{marginBottom: '10px'}}>
          즐겨찾기한 언론사
        </Typography>
      </Box>
      
      <Box className={classes.grid} style={{marginBottom: '50px'}}>
        <Box className={classes.gridList} >
          {bookmark.map((newsAgency) => (
            <Box key={newsAgency} className={classes.gridListTile}>
              <Button className={classes.button} stlye={{padding: '0px'}} onClick={(event) => changeBookmark(event, false)}>
                <img src={news_agency_logo(newsAgency)} alt={newsAgency} className={classes.imgLogo}/>
              </Button>
            </Box>
          ))}
          {Array.from({length: nonBookmark.length % 5, undefined}).map(() => {
            return(
              <Box className={classes.gridListTile} />
            )
          })}
        </Box>
      </Box>
      

      <Box display='flex'>
        <BookmarkIcon style={{ color: 'rgb(0, 0, 0, 0.54)', marginRight: '5px' }}/>
        <Typography style={{marginBottom: '10px'}}>
        즐겨찾기 하지 않은 언론사
        </Typography>
      </Box>

      <Box className={classes.grid}>
        <Box className={classes.gridList} >
          {nonBookmark.map((newsAgency) => (
            <Box key={newsAgency} className={classes.gridListTile}>
              <Button className={classes.button} stlye={{padding: '0px'}} onClick={(event) => changeBookmark(event, true)}>
                <img src={news_agency_logo(newsAgency)} alt={newsAgency} className={classes.imgLogo}/>
              </Button>
            </Box>
          ))}
          {Array.from({length: bookmark.length % 5, undefined}).map(() => {
            return(
              <Box className={classes.gridListTile} />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}