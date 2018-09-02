import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

class GenericMenu extends Component {
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

	render() {
		const { id, menuIcon, className, menuItems } = this.props;
		const { anchorMenuEl } = this.state;
		const openMenu = Boolean(anchorMenuEl);

		return (
			<div className={className}>
				<IconButton
					aria-owns={openMenu ? id : null}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit">
					{menuIcon ? menuIcon : <MenuIcon/>}
				</IconButton>

				<Menu
					id={id}
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
					{menuItems.map((item, id) => {
						return (
							<MenuItem key={id}
							          onClick={() => {
								          item.clickAction();
								          this.handleCloseMenu()
							          }}>
								{item.label}
							</MenuItem>
						)
					})}
				</Menu>
			</div>
		);
	}
}

GenericMenu.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	menuIcon: PropTypes.element,
};

export default GenericMenu;
