
import { IconButton, FormControl, NativeSelect } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setFontSize } from 'reducers/contentSetting';
import Box from '@material-ui/core/Box';

export default function FontController(props) {
  const fontSize = useSelector(store => store.contentSetting.fontSize)
  const dispatch = useDispatch()

  const fontArray = [14, 16, 18]

  const onChangeFontSize = () => {
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