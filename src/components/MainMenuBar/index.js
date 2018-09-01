import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getRandomImage } from '../../utils/randomGenerator';
import GenericMenu from '../GenericMenu';

const styles = () => ({
	root: {},
});

class MainMenuBar extends Component {

	static defaultProps = {};

	handleAddCard = () => {
		const { addACard } = this.props;
		addACard({ title: 'Added', launched: '32', img: getRandomImage() });
	};

	handleExportSettings = () => {
		console.log('exporting settings');
	};

	handleImportSettings = () => {
		console.log('importing settings');
	};

	render() {
		const { classes } = this.props;

		return (
			<GenericMenu
				className={classes.root}
				id={`${classes.root}-id`}
				menuItems={[
					{
						label: 'Add Shortcut',
						clickAction: this.handleAddCard,
					},
					{
						label: 'Export Settings',
						clickAction: this.handleExportSettings,
					},
					{
						label: 'Import Settings',
						clickAction: this.handleImportSettings,
					},
				]}
			/>
		);
	}
}

MainMenuBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenuBar);
