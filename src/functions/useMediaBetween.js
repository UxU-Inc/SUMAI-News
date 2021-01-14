
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
export default function useMediaBetween(a, b) {
    const theme = useTheme()

    const aSize = theme.breakpoints.values[a]
    const bSize = theme.breakpoints.values[b]

    return useMediaQuery(theme.breakpoints.between(aSize, bSize));
}