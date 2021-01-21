
import { IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setFontSize } from 'reducers/contentSetting';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';

function useScrollController() {
  const [prevScrollHeigth, setPrevScrollHeight] = useState(0)

  useEffect(() => {
    if(prevScrollHeigth === 0) return
    window.scrollTo(0, prevScrollHeigth * document.body.clientHeight)
  }, [prevScrollHeigth])

  return [setPrevScrollHeight]
}

export default function FontController(props) {
  const fontSize = useSelector(store => store.contentSetting.fontSize)
  const [setPrevScrollHeight] = useScrollController()
  const dispatch = useDispatch()

  const fontArray = [14, 16, 18]

  const onChangeFontSize = () => {
    setPrevScrollHeight((window.scrollY) / document.body.clientHeight)

    const current = fontArray.indexOf(fontSize)
    if(current+1 === fontArray.length) dispatch(setFontSize(fontArray[0]))
    else dispatch(setFontSize(fontArray[current+1]))
  }

  return (
    <Box {...props}>
      <IconButton style={{width:"40px", height:"40px", borderRadius:"100px", border:"2px solid #eee", padding:'0'}}
        edge="start"
        onClick={onChangeFontSize}
      >
        <Box fontSize={fontSize} fontWeight="bold">
          가
        </Box>
      </IconButton>
    </Box>
  )
}