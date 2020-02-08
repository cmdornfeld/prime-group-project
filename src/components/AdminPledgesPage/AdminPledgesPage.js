import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import dayjs from 'dayjs';

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

        const filterDates = this.state.filterDates === false ? (
            <Fragment>
                    <button
                    onClick={this.filterDates}
                    >
                        Filter
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <label>Starting Date:
                    <input 
                    type="date"
                    value={this.state.startingDate}
                    onChange={this.handleInputChangeFor('startingDate')}
                    />
                </label>

                <label>Ending Date:
                    <input 
                    type="date"
                    value={this.state.endingDate}
                    onChange={this.handleInputChangeFor('endingDate')}
                    />
                </label>
                <button
                onClick={this.cancelFilter}
                >
                    Cancel
                </button>
                <button
                onClick={this.sendFilter}
                >
                    Filter
                </button>
            </Fragment>
        )

        const deleteRows = this.state.deleteRows === false ? (
            <Fragment>
                    <button
                    onClick={this.deleteRows}
                    >
                        Delete Rows
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <label>Starting Date:
                    <input 
                    type="date"
                    value={this.state.startingDate}
                    onChange={this.handleInputChangeFor('startingDate')}
                    />
                </label>

                <label>Ending Date:
                    <input 
                    type="date"
                    value={this.state.endingDate}
                    onChange={this.handleInputChangeFor('endingDate')}
                    />
                </label>
                <button
                onClick={this.cancelDeleteRows}
                >
                    Cancel
                </button>
                <button
                onClick={this.sendDeleteRows}
                >
                    Delete
                </button>
            </Fragment>
        )

        return (
            <>
            <div>
                <AdminNav />
                <h2>Donations</h2>
            </div>
            <div>{filterDates}</div>
            <div>{deleteRows}</div>
            <div>
                <button onClick={this.refreshPage}>Refresh</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>Type</td>
                            <td>Amount</td>
                            <td>Max</td>
                            <td>Golfer</td>
                            <td>Status</td>
                            <td>Mark Paid</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.donationReducer.map( donation => {
                            return (
                                <tr key={donation.id}>
                                    <td>{dayjs(donation.date).format('MM/DD/YYYY')}</td>
                                    <td>{donation.first_name} {donation.last_name}</td>
                                    <td>{donation.phone_number}</td>
                                    <td>{donation.email}</td>
                                    <td>{donation.type}</td>
                                    <td>{donation.amount}</td>
                                    <td>{donation.max}</td>
                                    <td>{donation.firstname} {donation.lastname}</td>
                                    <td>{donation.status}</td>
                                    <td><input type="checkbox" name="status"
                                        checked={donation.status === 'paid'} onChange={() => this.updatePaymentStatus(donation.id, donation.status)}/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={this.exportToExcel}>Export</button>
            </div>
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    donationReducer: reduxStore.donationReducer
});

export default connect(putReduxStateOnProps)(AdminPledgesPage);