import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

class Pledge extends Component {
    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        golfer_id: '1',
        type: 'Flat',
        amount: '',
        max: '',
    }

    handleChangeFirstName = (e) => {
        this.setState({
            first_name: e.target.value
        })
    }
    handleChangeLastName = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }
    handleChangePhone = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleChangePledging = (e) => {
        this.setState({
            golfer_id: e.target.value
        })
    }
    handleChangeType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    handleChangeMax = (e) => {
        this.setState({
            max: e.target.value
        })
    }
    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }
    handleSubmit = () => {
        console.log('sumbit');
        this.props.dispatch({ type: 'POST_PLEDGE', payload: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            email: this.state.email,
            golfer_id: this.state.golfer_id,
            type: this.state.type,
            amount: this.state.amount,
            max: this.state.max
         }})
        //  this.setState({
        //     first_name: '',
        //     last_name: '',
        //     phone_number: '',
        //     email: '',
        //     golfer_id: '',
        //     type: '',
        //     amount: '',
        //     max: '',
        // })
        
    }
    componentDidMount() {
        this.getGolfers();
    }
    getGolfers = () => {
        this.props.dispatch({ type: 'GET_ALL_GOLFERS' })
    }

    render() {
        const maxBox = this.state.type === 'Per Birdie' ? (
            <Fragment>
                <label>Would you lik to set a Maximum Pledge?<br></br>
                    <input placeholder='Max' type='number' onChange={this.handleChangeMax} value={this.state.max}></input>
                </label>
            </Fragment>
        ) : (
            <Fragment>
                
            </Fragment>
        )
        return (
            <div>
                <Nav />
                <h1>Pledge</h1>
                <label>Name
                    <input placeholder='First Name' onChange={this.handleChangeFirstName} value={this.state.first_name}></input>
                    <input placeholder='Last Name' onChange={this.handleChangeLastName} value={this.state.last_name}></input>
                </label>
                <br></br>
                <label>Phone Number<br></br>
                    <input placeholder='Phone Number' type='number' onChange={this.handleChangePhone} value={this.state.phone_number}></input>
                </label>
                <br></br>
                <label>Email<br></br>
                    <input placeholder='Email' onChange={this.handleChangeEmail} value={this.state.email}></input>
                </label>
                <br></br>
                <label>Golfer You Are Pledging To<br></br>
                    <select onChange={this.handleChangePledging} value={this.state.golfer_id}>
                        {this.props.golferReducer.map( (item) => {
                        return(<option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>)
                        })}
                    </select>
                </label>
                <br></br>
                <label>Pledge Type<br></br>
                    <select onChange={this.handleChangeType} value={this.state.type}>
                        <option value="Flat">Flat</option>
                        <option value="Per Birdie">Per Birdie</option>
                    </select>
                </label>
                <br></br>
                {maxBox}
                <br />
                <label>Total<br></br>
                    <input type='number' onChange={this.handleChangeAmount} value={this.state.amount}></input>
                </label>
                <br></br>
                <button onClick={this.handleSubmit}>Pledge</button>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
  });

export default connect(putReduxStateOnProps) (Pledge);
