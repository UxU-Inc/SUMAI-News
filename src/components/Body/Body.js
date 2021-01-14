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
  },
  gridList: {
    width: "100%",
  },
  gridListTile: {
    padding: '10px',
    [theme.breakpoints.between(xs_size, xsm_size)]: {
      padding: '0px 0px 15px 0px',
    },
    [theme.breakpoints.between(xsm_size, sm_size)]: {
      padding: '0px 5px 10px 5px',
    },
    [theme.breakpoints.between(sm_size, md_size)]: {
      padding: '10px',
    },
  }
}));


export default function Body() {
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

  const ColsCount = useCallback(() => {
    if(xsm)     setViewCount(1);
    else if(sm) setViewCount(2);
    else if(md) setViewCount(3);
    else        setViewCount(4);
  }, [xsm, sm, md])

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
    itemRef.current.forEach((el, i) => {
      arr[i] = el.offsetTop
      sum += el.offsetTop
    })
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
    var idx = null
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
      <Box display="flex">
        {['', '', '', ''].slice(0, viewCount).map((t, k) => ( 
          <Grid container direction="column" style={{height:"auto"}} key={k}>
            {newsData.filter((x, idx) => idx%viewCount===k).map((tile, key) => (
              <Grid item key={key}>
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
      {/* <GridList cellHeight={410} className={classes.gridList} cols={viewCount}>
        {tileData.slice(0, dataCount).map((tile, key) => (
          <GridListTile style={{padding: "10px"}} cols={tile.cols || 1} key={key}>
            <Contents news={tile} currentId={currentId}/>
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