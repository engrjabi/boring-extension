import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MainMenuBar from './MainMenuBar';
import DateDisplay from './DateDisplay';

const styles = () => ({
  root: {
    flexGrow: 1,
    marginBottom: '4px',
  },
});

class ButtonAppBar extends Component {
	static defaultProps = {};

  render() {
    const { classes, addACard } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
	          <DateDisplay/>
	          <MainMenuBar addACard={addACard}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
