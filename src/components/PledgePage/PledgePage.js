import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import './pledgePage.css';

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
        if (this.state.phone_number.length < 10 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) || 
            this.state.first_name === '' || this.state.last_name === '' || this.state.phone_number === '' || 
            this.state.email === '' || this.state.amount === ''){
            alert('Please fill out the form completely')
        } else {
            if (/^\d{3}-\d{3}-\d{4}$/.test(this.state.phone_number) || /^\(\d{3}\)-\d{3}-\d{4}$/.test(this.state.phone_number) || 
            /^\(\d{3}\)\d{3}-\d{4}$/.test(this.state.phone_number) || /^\(\d{3}\)\s\d{3}-\d{4}$/.test(this.state.phone_number) || 
            /^\(\d{3}\)\s\d{3}\s\d{4}$/.test(this.state.phone_number)) {
            this.state.phone_number = this.state.phone_number.replace(/[()\\s-]+/g, "")
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
                this.setState({
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    golfer_id: '',
                    type: '',
                    amount: '',
                    max: '',
                }) 
        } 
        else {
            console.log(this.state)
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
            this.setState({
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                golfer_id: '',
                type: '',
                amount: '',
                max: '',
            }) 
        } 
        }
        
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
                <header class='pledge-header'><h1>PLEDGES</h1></header>
                <div class='pledge'>
                <h3>By filling out the form below, you are making a commitment to support the golfer of your choice in their 100 Holes for HOPE marathon. 
                    You will receive an e-mail after the event with a summary of information on your golfer's performance 
                    and specific instructions on how to honor this pledge directly to his/her pledge total.</h3>
                <h3>In order to keep the pace of play going and to ensure that the golfers can play a full 100 holes in daylight, 
                    we have modified some of the traditional rules of golf. If a ball is anywhere within a flag stick from the hole, 
                    that ball counts as "in the hole". Please be aware of this when pledging per birdie. An eagle will be worth two birdie pledges.</h3>
                </div>
                <div class='pledge-form'>
                <label>Name
                    <input placeholder='First Name' onChange={this.handleChangeFirstName} value={this.state.first_name}></input>
                    <input placeholder='Last Name' onChange={this.handleChangeLastName} value={this.state.last_name}></input>
                </label>
                <br></br>
                <label>Phone Number<br></br>
                    <input placeholder='Phone Number' type='text' onChange={this.handleChangePhone} value={this.state.phone_number}></input>
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
                <h5>Please indicate your pledge or pledges below. You may pledge to one or multiple categories. 
                    After the event and once scores have been calculated, you will be contacted with a total amount 
                    and payment can be made at that time.</h5>
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
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
  });

export default connect(putReduxStateOnProps) (Pledge);
