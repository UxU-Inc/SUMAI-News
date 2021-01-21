import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,

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
        [theme.breakpoints.up(1300)]: {
            margin: '16px 8px',
        },
    },
    gridContents: {
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
        [theme.breakpoints.up(1300)]: {
            padding: '0px 8px 16px 8px',
        },
    },
    grid : {
      [theme.breakpoints.up(580)]: {
        '&::after': {
          flex: '1',
          content: '""',
        },
        '&::before': {
          flex: '0.5',
          content: '""',
        }
      }
    }
}));

export { useStyles }