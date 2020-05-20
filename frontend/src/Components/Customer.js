import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import SignUp from './signUp.js'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import PropTypes from 'prop-types';
import LogIn from './LogIn.js';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardActions from '@material-ui/core/CardActions';
import ReactSearchBox from 'react-search-box'
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import SortIcon from '@material-ui/icons/Sort';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Container, Card, Box } from '@material-ui/core';
import Product from './CustProduct.js'
import CustomerProductView from './CustomerProductView.js'
import CustomerOrders from './CustomerOrders.js'

const phash = require('password-hash')
const sha1 = require('sha1')
const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
      color: red
    },
    menuButton: {
      color: red
    },
    signup: {
      
    },
    divider: {
        margin: theme.spacing(2, 2, 2),
        padding: theme.spacing(2, 2, 2),
    },
    card: {
        background: 'linear-gradient(90deg, #02acbf 30%, #046c78 90%)'
    }
  });


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Customer extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props){
        super(props)
        const { cookies } = props
        console.log(cookies.get('loggedIn'))
        this.state = {
            showMyComponent: false,
            loggedIn: cookies.get('loggedIn'),
            customer: cookies.get('customer'),
            vendor: cookies.get('vendor'),
            productName: '',
            bundlePrice: 0,
            bundleQuantity: 0,
            userId: cookies.get('user'),
            orders: [],
            searchText: '',
            products: [],
            filter: '',
            itemQuantity: 0,
            itemsLeft: 0,
            view: 'products'
        }
        this.logOut = this.logOut.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        this.getOrders = this.getOrders.bind(this)
        this.changeView = this.changeView.bind(this)
        this.onChangeSearchText = this.onChangeSearchText.bind(this)
        this.onChangeFilter = this.onChangeFilter.bind(this)
    }
    componentDidMount(){
        this.fetchProducts()
        this.getOrders()
    }
    onChangeSearchText(event) {
        this.setState({ searchText: event.target.value }, () => {
            console.log(this.state.searchText)
        });
    }
    onChangeFilter(event) {
        this.setState({ filter: event.target.value });
        console.log(this.state.filter)
    }
    fetchProducts = async() => {
        const {cookies} = this.props
        console.log('hello')
        console.log(this.state.searchText)
        const product = {
            productName: this.state.searchText,
            filter: this.state.filter
        }
        var post = axios.post('http://localhost:4000/searchProducts', product)
        .then(res => {
            console.log(res.data.length)
            console.log(res.data)
            this.setState({
                products: res.data
            })
            console.log(this.state.data)
        })
        return 
    }
    getOrders = async() => {
        const {cookies} = this.props
        console.log('hello')
        console.log(this.state.searchText)
        const order = {
            userId: cookies.get('user'),
            productName: this.state.searchText,
            filter: this.state.filter
        }
        var post = axios.post('http://localhost:4000/getOrders', order)
        .then(res => {
            console.log(res.data.length)
            console.log(res.data)
            this.setState({
                orders: res.data
            }, () => {
                console.log(this.state.data, 'ejlhef;')
            })
        })
        return 
    }

    changeView(view){
        this.setState({
            view: view
        })
        this.fetchProducts()
        this.getOrders()
        console.log(this.state.view)
    }
    logOut(){
        const {cookies} = this.props
        cookies.remove('user')
        cookies.remove('loggedIn')
        cookies.remove('customer')
        cookies.remove('vendor')
        window.location.reload()
    }
    render(){
        const {classes} = this.props
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" className={classes.title} style={{flex: 1}}>
                        Home
                    </Typography>
                    <span style={this.state.view ==='products' ? {} : {display: 'none'}}>
                        <Button color="inherit" className='float-right' onClick = {() => this.changeView('orders')}>Your Orders</Button>
                    </span>
                    <span style={this.state.view ==='orders' ? {} : {display: 'none'}}>
                        <Button color="inherit" className='float-right' onClick = {() => this.changeView('products')}>See All Products</Button>
                    </span>
                    {/* <Link to='/orders'>
                        <span style={this.state.view ==='products' ? {} : {display: 'none'}}>
                            <Button color="inherit" className='float-right' onClick = {() => this.changeView('orders')}>Your Orders</Button>
                        </span>
                    </Link>
                    <Link to='/'>
                        <span style={this.state.view ==='orders' ? {} : {display: 'none'}}>
                            <Button color="inherit" className='float-right' onClick = {() => this.changeView('products')}>See All Products</Button>
                        </span>
                    </Link> */}
                    <Button color="inherit" className='float-right' onClick = {this.logOut}>Sign Out</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <div style={this.state.view === 'products' ? {} : {display: 'none'}}>
                        <CustomerProductView data = {this.state.products} fetchProducts = {this.fetchProducts} onChangeSearchText = {this.onChangeSearchText} onChangeFilter = {this.onChangeFilter} />
                    </div> 
                    <div style={this.state.view === 'orders' ? {} : {display: 'none'}}>
                        <CustomerOrders data = {this.state.orders} getOrders = {this.getOrders} onChangeSearchText = {this.onChangeSearchText} onChangeFilter = {this.onChangeFilter} />
                    </div> 
                </Container>
                {/* <Container>
                </Container> */}
            </div>
        )
    }
}
export default withCookies(withStyles(styles)(Customer));