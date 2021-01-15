import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from 'axios';
import { useSelector } from 'react-redux';

import tileData from './tileData';

import Contents from './Contents';
import { NativeSelect } from '@material-ui/core';

const xs_size = 0;
const xsm_size = 580;
const sm_size = 840;
const md_size = 1100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,

    margin: "16px 8px",
    [theme.breakpoints.between(0, 640)]: {
      margin: '0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      margin: '0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      margin: '8px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      margin: '16px 8px',
    },
    [theme.breakpoints.between(840, 1300)]: {
      margin: '16px 4px',
    },
  },
  gridContents: {
    padding: '0px 8px 16px 8px',
    [theme.breakpoints.between(0, 580)]: {
      padding: '0px 0px 16px 0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      padding: '0px 0px 8px 0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      padding: '0px 4px 8px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      padding: '0px 8px 16px 8px',
    },
    [theme.breakpoints.between(840, 1300)]: {
      padding: '0px 4px 8px 4px',
    },
  }
}));


export default function Body(props) {
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const [hideSkel, setHideSkel] = useState([])
  const currentId = useSelector(store => store.authentication.status.currentId)

  const itemRef = useRef([])

  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between(xs_size, xsm_size));
  const sm = useMediaQuery(theme.breakpoints.between(xsm_size, sm_size));
  const md = useMediaQuery(theme.breakpoints.between(sm_size, md_size));
  const lg = useMediaQuery(theme.breakpoints.up(md_size));

  const {colCount} = props

  const ColsCount = useCallback(() => {
    const changeCount = (count) => {
      setViewCount(count< colCount? count: colCount)
    }
    if(xsm)     changeCount(1);
    else if(sm) changeCount(2);
    else if(md) changeCount(3);
    else if(lg) changeCount(4);
  }, [xsm, sm, md, lg, colCount])

  const NewsMain = useCallback((idx, cnt) => {
    const id = currentId
    axios.post('http://localhost:3306/api/news/lastest', { id, idx, cnt })   //링크 바꿔야됨
    .then((response) => {
      setNewsData(newsData.concat(response.data))
      if(response.data.length < cnt) {
        setIsAllLoad(true)
      }
      setLoading(false)
    }).catch((error) => {

    })
  }, [newsData, currentId])

  const handleSkeleton = useCallback(() => {
    var arr = [], temp = []
    var sum = 0
    for(let i=0; i<viewCount; i++) {
      arr[i] = itemRef.current[i].offsetTop
      sum += arr[i]
    }
    sum /= viewCount
    arr.forEach((el, i) => {
      arr[i] -= sum
      if(arr[i] > 200) temp[i] = true
    })
    setHideSkel(temp)
    console.log(arr)
  }, [viewCount]);

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    
    if (newsData[newsData.length-1] && scrollHeight - innerHeight - scrollTop < 250 && !loading && !isAllLoad) {
      setLoading(true)
      NewsMain(newsData[newsData.length-1].idx-1, viewCount*3-(dataCount%viewCount))
      setDataCount(dataCount+viewCount*3-(dataCount%viewCount))
      console.log(newsData[newsData.length-1].idx-1)
    }
  }, [loading, newsData, dataCount, viewCount, NewsMain, isAllLoad]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    ColsCount()
    handleSkeleton()
    let idx = null
    if(newsData[newsData.length-1]) idx = newsData[newsData.length-1].idx-1;
    else idx = -1;

    if(dataCount < viewCount*3) {
      setLoading(true)
      NewsMain(idx, viewCount*3-(dataCount%viewCount))
      setDataCount(dataCount+viewCount*3-(dataCount%viewCount))
    } else if(dataCount%viewCount){
      setDataCount(dataCount-(dataCount%viewCount))
    }
  }, [ColsCount, viewCount, NewsMain, newsData, dataCount, handleSkeleton]);

  return (
    <Box className={classes.root}>
      <Box display="flex" width="100vw">
        {['', '', '', ''].slice(0, viewCount).map((t, k) => ( 
          <Grid container direction="column" style={{height:"auto"}} key={k}>
            {newsData.filter((x, idx) => idx%viewCount===k).map((tile, key) => (
              <Grid item key={key} className={classes.gridContents} style={{padding: "none"}}>
                <Contents news={tile} currentId={currentId}/>
              </Grid>
            ))}
            <Grid style={newsData.length === 0? {display:"none"}:{padding: "10px"}} ref={(el) => itemRef.current[k] = el}>
              {!isAllLoad && !hideSkel[k]? <><Skeleton variant="text" height={100} />
              <Skeleton variant="rect" height={300} /></>:null}
            </Grid>
          </Grid>
        ))}
      </Box>
      {/* <GridList cellHeight={xsm ? 'auto' : 410} className={classes.gridList} style={{margin: "none"}} cols={viewCount}>
        {tileData.slice(0, dataCount).map((tile, key) => (
          <GridListTile className={classes.gridListTile} style={{padding: "none"}} cols={tile.cols || 1} key={key}>
            <Contents news_agency={tile.news_agency} title={tile.title} summary={tile.summary} idx={tile.idx} currentId={currentId}/>
          </GridListTile>
        ))}
        {!isAllLoad? ['', '', '', ''].slice(0, viewCount).map((tile, key) => ( 
          <GridListTile style={newsData.length === 0? {display:"none"}:{padding: "10px"}} key={key}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rect" height={300} />
          </GridListTile>
        )):null}
      </GridList> */}
    </Box>
  )
}