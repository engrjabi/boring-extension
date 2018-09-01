import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Moment from 'react-moment';
import { copyToClipboard } from '../../utils/browserCommands';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	interaction: {
		cursor: 'pointer',
		userSelect: 'none',
		textAlign: 'left',
	},
	typography: {
		margin: theme.spacing.unit * 2,
		letterSpacing: '2px',
	},
});

class MainDateDisplay extends Component {
	static defaultProps = {
		timeToDisplay: new Date(),
	};

	constructor(props) {
		super(props);
		this.state = {
			anchorDateEl: null,
		};
	}

	handleClosePopOver = () => {
		this.setState({ anchorDateEl: null });
	};

	handleCopyDate = event => {
		const { textContent } = event.currentTarget;
		copyToClipboard(textContent);
		this.setState({ anchorDateEl: event.currentTarget });
		setTimeout(() => {
			this.setState({ anchorDateEl: null });
		}, 800);
	};

	render() {
		const { classes } = this.props;
		const { anchorDateEl } = this.state;
		const openPopOver = Boolean(anchorDateEl);

		return (
			<div className={classes.root}>
				<Typography
					variant="title"
					color="inherit"
					className={`${classes.flex} ${classes.interaction}`}
				>
					<Moment
						interval={60000}
						onClick={this.handleCopyDate}
						format="[Week] WW | MMMM DD, YYYY | hh:mm A"
					/>
				</Typography>

				<Popover
					id="simple-popper"
					open={openPopOver}
					anchorEl={anchorDateEl}
					onClose={this.handleClosePopOver}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
					<Typography className={classes.typography}>Copied!</Typography>
				</Popover>
			</div>
		);
	}
}

MainDateDisplay.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDateDisplay);
