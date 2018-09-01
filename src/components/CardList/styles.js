import red from '@material-ui/core/colors/red';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  gridListTile: {
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50% !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '25% !important',
    },
    [theme.breakpoints.up('lg')]: {
      width: '12.5% !important',
    },
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  avatarWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '1',
  },
	avatarWrapperHoverEffect: {
		opacity: '0',
		transition: 'all 300ms linear',
		'&:hover': {
			opacity: '0.8',
		},
	},
  avatar: {
    backgroundColor: red[500],
    width: '60px',
    height: '60px',
    position: 'relative',
    margin: '12% auto',
  },
  buttonWrapper: {
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  focusVisible: {},
});
