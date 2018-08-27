import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import Moment from 'react-moment';
import { copyToClipboard } from '../../utils/browserCommands';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '4px',
  },
  flex: {
    flexGrow: 1,
  },
  interaction: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    letterSpacing: '2px',
  },
});

class ButtonAppBar extends Component {
  static defaultProps = {
    timeToDisplay: new Date(),
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorMenuEl: null,
      anchorDateEl: null,
    };
  }

  handleMenu = event => {
    this.setState({ anchorMenuEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorMenuEl: null });
  };

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
    const { classes, addACard } = this.props;
    const { anchorMenuEl, anchorDateEl } = this.state;
    const openMenu = Boolean(anchorMenuEl);
    const openPopOver = Boolean(anchorDateEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
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
              }}
            >
              <Typography className={classes.typography}>Copied!</Typography>
            </Popover>

            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MenuIcon />
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
              onClose={this.handleCloseMenu}
            >
              <MenuItem
                onClick={() => addACard({ title: 'Added', launched: '32' })}
              >
                Add Shortcut
              </MenuItem>
              <MenuItem onClick={this.handleCloseMenu}>
                Export Settings
              </MenuItem>
              <MenuItem onClick={this.handleCloseMenu}>
                Import Settings
              </MenuItem>
            </Menu>
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
