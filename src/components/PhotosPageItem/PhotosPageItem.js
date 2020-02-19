import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }


export class PhotosPageItem extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
      
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
                <Fragment>
                <img src={this.props.item.url} alt={this.props.item.description} width='240px' height='200px' style={{objectFit: 'scale-down'}} textAlign='center' onClick={this.handleClickOpen}/>
                <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <img src={this.props.item.url} alt={this.props.item.description} width='100%' />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    close
                    </Button>
                    </DialogActions>
                </Dialog>
                </Fragment>
            )
    }
}

export default connect()(PhotosPageItem);
