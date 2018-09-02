import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GenericMenu from '../../GenericComponents/GenericMenu/index';
import GenericModal from '../../GenericComponents/GenericModal/index';
import BasicForm from '../AddShortcutForm';

const styles = () => ({
	root: {},
});

class MainMenuBar extends Component {

	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
		}
	}

	handleAddCard = () => {
		const { addACard } = this.props;
		// addACard({ title: 'Added', launched: '32', img: getRandomImage() });
		this.setState({ openModal: true });
	};

	handleCloseModal = () => {
		this.setState({ openModal: false });
	};

	handleExportSettings = () => {
		console.log('exporting settings');
	};

	handleImportSettings = () => {
		console.log('importing settings');
	};

	render() {
		const { classes } = this.props;
		const { openModal } = this.state;

		return (
			<div>
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

				<GenericModal
					openStatus={openModal}
					handleClose={this.handleCloseModal}>
					<BasicForm/>
				</GenericModal>
			</div>
		);
	}
}

MainMenuBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenuBar);
