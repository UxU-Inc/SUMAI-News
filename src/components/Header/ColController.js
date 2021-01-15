
import { FormControl, InputBase, InputLabel, NativeSelect } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 26px 5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function ColController(props) {
  const {colCount, setColCount} = props

  return (
    <FormControl>
      {/* <InputLabel htmlFor="demo-customized-select-native" variant='filled' >갯수</InputLabel> */}
      <NativeSelect
        id="demo-simple-select-outlined"
        value={colCount}
        onChange={(event) => setColCount(event.target.value)}
        input={<BootstrapInput />}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </NativeSelect>
    </FormControl>
  )
}