import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import dayjs from 'dayjs';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    header: {
        textAlign: 'center',
        fontSize: '6rem',
        padding: 0,
        margin: '2rem',
        color: '#253155'
    },
    topMargin: {
        marginTop: '100px'
    },
    center: {
        margin: '0 auto',
        textAlign: 'center'
    },
    table: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    height: {
        height: 800,
        overflow: 'auto'
    }
   
}

export class AdminPledgesPage extends Component {

    state = {
        startingDate: '',
        endingDate: '',
        filterDates: false,
        deleteRows: false
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_DONATION_INFO' });
    }

    updatePaymentStatus = (id, status)  => {
        console.log('in markAsPaid', id);
        this.props.dispatch({ type: 'UPDATE_PAYMENT_STATUS', payload: {id: id, status: status} })
    }

    exportToExcel = () => {
        console.log('in exportToExcel');
        this.props.dispatch({ type: 'EXPORT_DONATIONS' })
    }

    filterDates = () => {
        this.setState({
            filterDates: true
        })
    }

    sendFilter = () => {
        this.props.dispatch({type: 'SEND_FILTER_DATES', payload: {
            startingDate: this.state.startingDate,
            endingDate: this.state.endingDate
        }})
        this.setState({
            filterDates: false
        })
    }

    cancelFilter = () => {
        this.setState({
            filterDates: false
        })
    }

    deleteRows = () => {
        this.setState({
            deleteRows: true
        })
    }

    sendDeleteRows = () => {
        this.props.dispatch({type: 'SEND_DELETE_ROWS', payload: {
            startingDate: this.state.startingDate,
            endingDate: this.state.endingDate
        }})
        this.setState({
            deleteRows: false
        })
    }

    cancelDeleteRows = () => {
        this.setState({
            deleteRows: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    refreshPage() {
        window.location.reload(false);
    }

    render() {

        const { classes } = this.props;

        const filterDates = this.state.filterDates === false ? (
            <Fragment>
                    <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginTop: '10px'}}
                    onClick={this.filterDates}
                    >
                        Filter
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <TextField
                label="Starting Date"
                variant="outlined"
                type="date"
                style={{marginRight: '5px'}}
                value={this.state.startingDate}
                onChange={this.handleInputChangeFor('startingDate')}
                InputLabelProps={{
                    shrink: true,
                    }}
                />

                <TextField
                label="Ending Date"
                variant="outlined"
                type="date"
                style={{marginLeft: '5px'}}
                value={this.state.endingDate}
                onChange={this.handleInputChangeFor('endingDate')}
                InputLabelProps={{
                    shrink: true,
                    }}
                />
                <div>
                    <Button
                    variant="contained"
                    style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                    onClick={this.cancelFilter}
                    >
                        Cancel
                    </Button>
                    <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    onClick={this.sendFilter}
                    >
                        Filter
                    </Button>
                </div>
            </Fragment>
        )

        const deleteRows = this.state.deleteRows === false ? (
            <Fragment>
                    <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginTop: '10px'}}
                    onClick={this.deleteRows}
                    >
                        Delete Rows
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginTop: '20px'}}>
                    <TextField
                    label="Starting Date"
                    variant="outlined"
                    type="date"
                    style={{marginRight: '5px'}}
                    value={this.state.startingDate}
                    onChange={this.handleInputChangeFor('startingDate')}
                    InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                    label="Ending Date"
                    variant="outlined"
                    type="date"
                    style={{marginLeft: '5px'}}
                    value={this.state.endingDate}
                    onChange={this.handleInputChangeFor('endingDate')}
                    InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <div>
                        <Button
                        variant="contained"
                        style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                        onClick={this.cancelDeleteRows}
                        >
                            Cancel
                        </Button>
                        <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                        onClick={this.sendDeleteRows}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Fragment>
        )

        return (
            <>
            <div>
                <AdminNav />
            </div>
            <div className={classes.topMargin}>
                <div style={{textAlign: 'center'}}>
                    <h2 className={classes.header}>Donations</h2>
                </div>
                <div className={classes.center}>
                    <div>
                        {filterDates}
                    </div>
                    <div>
                        {deleteRows}
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginTop: '10px', marginBottom: '10px'}}
                        onClick={this.refreshPage}
                        >
                            Refresh
                        </Button>
                    </div>
                    <div className={classes.height}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Max</TableCell>
                                        <TableCell>Golfer</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Mark Paid</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.donationReducer.map( donation => {
                                        return (
                                            <TableRow key={donation.id}>
                                                <TableCell>{dayjs(donation.date).format('MM/DD/YYYY')}</TableCell>
                                                <TableCell>{donation.first_name} {donation.last_name}</TableCell>
                                                <TableCell>{donation.phone_number}</TableCell>
                                                <TableCell>{donation.email}</TableCell>
                                                <TableCell>{donation.type}</TableCell>
                                                <TableCell>${parseInt(donation.amount).toLocaleString()}</TableCell>
                                                <TableCell>{donation.max}</TableCell>
                                                <TableCell>{donation.firstname} {donation.lastname}</TableCell>
                                                <TableCell>{donation.status}</TableCell>
                                                <TableCell><input type="checkbox" name="status"
                                                    checked={donation.status === 'paid'} onChange={() => this.updatePaymentStatus(donation.id, donation.status)}/>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginTop: '10px'}}
                        onClick={this.exportToExcel}
                        >
                            Export
                        </Button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    donationReducer: reduxStore.donationReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminPledgesPage));
