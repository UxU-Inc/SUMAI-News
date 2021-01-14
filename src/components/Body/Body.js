import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinearProgress from '@material-ui/core/LinearProgress';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from 'axios';
import { useSelector } from 'react-redux';

import tileData from './tileData';

import Contents from './Contents';

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
}));


export default function Body() {
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const currentId = useSelector(store => store.authentication.status.currentId)

  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between('xs', theme.breakpoints.values.xsm));  // 0~360
  const sm = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.xsm, 'sm'));  // 360~600
  const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));  // 600~720
  const lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));  // 720~1280
  const xl = useMediaQuery(theme.breakpoints.between('lg', 'xl'));  // 1280~1920

  const ColsCount = useCallback(() => {
    if(xsm)     setViewCount(1);
    else if(sm) setViewCount(2);
    else if(md) setViewCount(3);
    else if(lg) setViewCount(4);
    else if(xl) setViewCount(5);
    console.log("c")
  }, [xsm, sm, md, lg, xl])

  const NewsMain = useCallback((idx, cnt) => {
    axios.post('http://localhost:3306/api/news/lastest', { idx, cnt })
    .then((response) => {
      setNewsData(newsData.concat(response.data))
      if(response.data.length < cnt) {
        setIsAllLoad(true)
      }
      setLoading(false)
      console.log("a")
    }).catch((error) => {

    })
  }, [newsData])

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
    var idx = null
    if(newsData[newsData.length-1]) idx = newsData[newsData.length-1].idx-1;
    else idx = -1;
    console.log("cca")
    if(dataCount < viewCount*3) {
      setLoading(true)
      NewsMain(idx, viewCount*3-(dataCount%viewCount))
      setDataCount(dataCount+viewCount*3-(dataCount%viewCount))
      console.log("aa")
    } else if(dataCount%viewCount){
      setDataCount(dataCount-(dataCount%viewCount))
      console.log("abb")
    }
  }, [ColsCount, viewCount, NewsMain, newsData, dataCount]);

  console.log(dataCount)
  console.log(loading)
  console.log(isAllLoad)

  return (
    <Box className={classes.root}>
      <GridList cellHeight={410} className={classes.gridList} cols={viewCount}>
        {newsData.slice(0, dataCount).map((tile, key) => (
          <GridListTile style={{padding: "10px"}} cols={tile.cols || 1} key={key}>
            <Contents news_agency={tile.news_agency} title={tile.title} summary={tile.summary} idx={tile.idx} currentId={currentId}/>
          </GridListTile>
        ))}
        {!isAllLoad? ['', '', '', '', ''].slice(0, viewCount).map((tile, key) => ( 
          <GridListTile style={newsData.length === 0? {display:"none"}:{padding: "10px"}} key={key}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rect" height={300} />
          </GridListTile>
        )):null}
      </GridList>
      {/* <LinearProgress style={{width:"100%", marginTop: "20px", marginBottom: "20px"}}/> */}
    </Box>
  )
}