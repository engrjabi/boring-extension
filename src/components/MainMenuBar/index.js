import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { getRandomImage } from '../../utils/randomGenerator';

const styles = () => ({
	root: {},
});

class MainMenuBar extends Component {
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {
			anchorMenuEl: null,
		};
	}

	handleMenu = event => {
		this.setState({ anchorMenuEl: event.currentTarget });
	};

	handleCloseMenu = () => {
		this.setState({ anchorMenuEl: null });
	};

	handleAddCard = () => {
		const { addACard } = this.props;
		addACard({ title: 'Added', launched: '32', img: getRandomImage() });
		this.handleCloseMenu();
	};

	render() {
		const { classes } = this.props;
		const { anchorMenuEl } = this.state;
		const openMenu = Boolean(anchorMenuEl);

		return (
			<div className={classes.root}>
				<IconButton
					aria-owns={openMenu ? 'menu-appbar' : null}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit">
					<MenuIcon/>
				</IconButton>

				<Menu
					id="menu-appbar"
					anchorEl={anchorMenuEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={openMenu}
					onClose={this.handleCloseMenu}>
					<MenuItem
						onClick={this.handleAddCard}>
						Add Shortcut
					</MenuItem>
					<MenuItem onClick={this.handleCloseMenu}>
						Export Settings
					</MenuItem>
					<MenuItem onClick={this.handleCloseMenu}>
						Import Settings
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

MainMenuBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenuBar);
