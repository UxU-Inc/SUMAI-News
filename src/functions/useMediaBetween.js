
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
function number(a, b) {
    const theme = useTheme()

    return useMediaQuery(theme.breakpoints.between(a, b));
}
function string(a, b) {
    const theme = useTheme()

    const aSize = theme.breakpoints.values[a]
    const bSize = theme.breakpoints.values[b]

    return useMediaQuery(theme.breakpoints.between(aSize, bSize));
}

export default function useMediaBetween(a, b) {
    if(typeof a===typeof b) {
        if(typeof a==="string") return number(a,b)
        else return string(a,b)
    }
}