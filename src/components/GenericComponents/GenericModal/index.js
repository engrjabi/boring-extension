import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: '25rem',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: '1.5rem',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
});

class GenericModal extends React.Component {

	render() {
		const { classes, handleClose, openStatus, children } = this.props;

		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={openStatus}
				onClose={handleClose}>
				<div className={classes.paper}>
					{children}
				</div>
			</Modal>
		);
	}
}

GenericModal.propTypes = {
	classes: PropTypes.object.isRequired,
	handleClose: PropTypes.func,
	openStatus: PropTypes.bool,
};

// We need an intermediary variable for handling the recursive nesting.
const GenericModalWrapped = withStyles(styles)(GenericModal);

export default GenericModalWrapped;
