import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import './pledgePage.css';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles =  {
    card: {
        width: 900,
        height: 'auto',
        textAlign: 'center',
        margin: ' 0 auto',
        padding: 30,
        backgroundColor: '#ffffff',
  
    },
    title: {
        width: 600,
    },
    topMargin: {
        marginTop: '100px'
    },
}

class Pledge extends Component {
    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        golfer_id: '',
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
            this.state.email === '' || this.state.amount === '' || this.state.golfer_id === ''){
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
                alert('Thank you for your donation, please check your the email address you entered for conformation.')
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
            alert('Thank you for your donation, please check your the email address you entered for conformation.')
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

        const { classes } = this.props;

        const perBirdiePledge = this.state.type === 'Per Birdie' ? (
                <div style={{width: '50%', margin: '0 auto'}}>
                    <TextField
                        label="Per birdie donation"
                        variant="outlined"
                        type='number'
                        onChange={this.handleChangeAmount}
                        value={this.state.amount}
                        helperText="Eagles will count as 2 Birdies. Minimum pledge $1.00."
                        style={{width: '50%', marginTop: '5%'}}
                    />
                    <br/>
                    <TextField
                        label="Maxium donation"
                        variant="outlined" 
                        type='number' 
                        onChange={this.handleChangeMax} 
                        value={this.state.max}
                        helperText="This is the amount you will be billed if your per birdie pledge amount multiplied by the golfers total number of birdies
                            exceeds the maximum donation you set."
                        style={{width: '50%', marginTop: '5%'}}
                    />
                </div>
        ) : (
            <Fragment>
                
            </Fragment>
        )

        const flatPledge = this.state.type === 'Flat' ? (
            <div>
                <TextField
                label="Pledge Total"
                variant="outlined"
                type='number'
                onChange={this.handleChangeAmount}
                value={this.state.amount}
                helperText="Minimum pledge $1.00."
                />
            </div>
        ) : (
            <Fragment>

            </Fragment>
        )
        
        return (
            <div>
                <Nav />
                <div className={classes.topMargin}>
                    <h1>PLEDGE</h1>
                </div>
                <div style={{textAlign: 'left', width: 800, margin: '0 auto'}}>
                    <p>By filling out the form below, you are making a commitment to support the golfer of your choice in their 100 Holes for HOPE marathon. 
                        You will receive an e-mail after the event with a summary of information on your golfer's performance 
                        and specific instructions on how to honor this pledge directly to his/her pledge total.
                        <br/><br/>
                        In order to keep the pace of play going and to ensure that the golfers can play a full 100 holes in daylight, 
                        we have modified some of the traditional rules of golf. If a ball is anywhere within a flag stick from the hole, 
                        that ball counts as "in the hole". Please be aware of this when pledging per birdie. An eagle will be worth two birdie pledges.
                    </p>
                </div>

                <Card className={classes.card}>
                    <div>
                        <div>
                            <h4>Name</h4>
                        </div>
                        <TextField 
                            label="First Name"
                            variant="outlined"
                            style={{marginRight: 10}}
                            placeholder='First Name'
                            type="text"
                            onChange={this.handleChangeFirstName} 
                            value={this.state.first_name} 
                        />
                        <TextField 
                            label="Last Name"
                            variant="outlined"
                            style={{marginLeft: 10}}
                            placeholder='Last Name'
                            type="text" 
                            onChange={this.handleChangeLastName} 
                            value={this.state.last_name}
                        />
                    </div>
                    <div>
                        <h4>Phone Number</h4>
                    </div>
                    <div>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            placeholder='Phone Number'
                            type='text' 
                            onChange={this.handleChangePhone} 
                            value={this.state.phone_number} 
                        />
                    </div>
                    <div>
                        <h4>Email</h4>
                    </div>
                    <div>
                        <TextField
                        label="Email"
                        variant="outlined"
                        placeholder='Email'
                        type="text"
                        onChange={this.handleChangeEmail}
                        value={this.state.email} />
                    </div>
                <div>
                    <h4>Golfer You are Pledging to</h4>
                </div>
                <div style={{marginBottom: 20}}>
                    <Select 
                    variant="outlined"
                    onChange={this.handleChangePledging} 
                    // value={this.state.golfer_id}
                    >
                        {this.props.golferReducer.map( (item) => {
                        return(<MenuItem key={item.id} value={item.id}>{item.first_name} {item.last_name}</MenuItem>)
                        })}
                    </Select>
                </div>
                <div>
                    <p style={{textAlign: 'center', width: 500, margin: '0 auto'}}>
                        Please indicate your pledge below. After the event and once scores have been calculated, you will be contacted with a total amount 
                        and payment can be made at that time.
                    </p>
                </div>
                <div>
                    <h4>Pledge Type</h4>
                </div>
                <div>
                    <Select
                        variant="outlined"
                        onChange={this.handleChangeType} 
                        value={this.state.type}
                    >
                        <MenuItem value="Flat">Flat</MenuItem>
                        <MenuItem value="Per Birdie">Per Birdie</MenuItem>
                    </Select>
                </div>
               
                <br/>
                {perBirdiePledge}
                <br/>
                {flatPledge}
                <div>
                    <Button
                        variant="contained"
                        style={{backgroundColor: 'rgb(180,151,89)', marginTop:10}}
                        onClick={this.handleSubmit}
                    >
                        Pledge
                    </Button>
                </div>
                </Card>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
  });

export default connect(putReduxStateOnProps)(withStyles(styles)(Pledge));
