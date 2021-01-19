import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as NewsAgencyInfo from '../NewsAgencyInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 30px',
    '@media (max-width: 600px) and (min-width: 0px)': {
      margin: '0px',
    },
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
    flex: '1 0 20%', // 몇 열인지. 20%면 100/20 이므로 5개 
    minWidth:'150px', // item의 최소 width. 화면의 크기에 따라 동적으로 열의 개수를 제한하기 위해
    
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function requestBookmark() {
  return new Promise((res, rej) => axios('/api/bookmark/').then((data) => {
    res(data.data)
  }).catch((err) => {
    rej(err)
  }))
}

function useBookmark() {
  const allNewsAgency = Object.keys(NewsAgencyInfo.list).map((agency) => agency);
  const [bookmark, setBookmark] = React.useState([])
  const nonBookmark = allNewsAgency.filter(x => !bookmark.includes(x))
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    requestBookmark().then((data) => {
      setBookmark(data)
    }).catch(() => {
      // 실패
    })
  }, [])

  const changeBookmark = React.useCallback((event, bool) => {
    let newsAgency
    if(typeof (event.target.alt) === "undefined") {
      newsAgency = event.target.getElementsByTagName('img')[0].alt
    } else {
      newsAgency = event.target.alt
    }
    if (!loading) {
      setLoading(true)
      if (bool === true) {
        axios.post('/api/bookmark/add', { bookmark: newsAgency }).then(() => {
          setBookmark([...bookmark, newsAgency]) // 추가
        }).catch((err) => {
          // 실패
        }).finally(() => {
          setLoading(false)
        })
      } else {
        axios.post('/api/bookmark/delete', { bookmark: newsAgency }).then(() => {
          bookmark.splice(bookmark.indexOf(newsAgency), 1)
          setBookmark([...bookmark])
        }).catch((err) => {
          // 실패
        }).finally(() => {
          setLoading(false)
        })
      }
    }
  }, [bookmark, loading])

  return [bookmark, nonBookmark, changeBookmark, loading]
}

function useItemCount() {
  const flexElement = React.useRef()
  const [itemCount, setItemCount] = React.useState(0)

  // itemCount를 변경하는 부분
  const changeItemCount = React.useCallback(() => {
    const count = Math.floor(flexElement.current.offsetWidth / 150)
    setItemCount(count < 5 ? count : 5)
  }, [setItemCount])

  // itemCount를 변경해주기 위해 초기화하는 부분
  React.useEffect(() => {
    changeItemCount()
    window.addEventListener("resize", changeItemCount)
    return () => window.removeEventListener("resize", changeItemCount)
  }, [changeItemCount])

  return [itemCount, flexElement]
}

export {
  useStyles,
  useBookmark,
  useItemCount,
}