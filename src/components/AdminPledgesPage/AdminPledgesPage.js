import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';

export class AdminPledgesPage extends Component {

    state = {
        status: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_DONATION_INFO' });
    }

    markAsPaid = (id)  => {
        console.log('in markAsPaid');
        this.setState({
            status: 'paid'
        });
        // this.props.dispatch({ type: 'MARK_AS_PAID', payload: {status: this.state.status, id: id} })
    }

    exportToExcel = () => {
        console.log('in exportToExcel');
        this.props.dispatch({ type: 'EXPORT_DONATIONS' })
    }

    render() {
        return (
            <>
            <div>
                <AdminNav />
                <h2>Donations</h2>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
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
                                    <td>{donation.first_name} {donation.last_name}</td>
                                    <td>{donation.phone_number}</td>
                                    <td>{donation.email}</td>
                                    <td>{donation.type}</td>
                                    <td>{donation.amount}</td>
                                    <td>{donation.max}</td>
                                    <td>{donation.firstname} {donation.lastname}</td>
                                    <td>{donation.status}</td>
                                    <td><button type="checkbox" name="status" onClick={() => this.markAsPaid(donation.id)}>Paid</button></td>
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