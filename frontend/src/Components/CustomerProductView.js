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

class CustomerProductView extends Component{
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
            data: [],
            searchText: '',
            products: [],
            filter: '',
            itemQuantity: 0,
            itemsLeft: 0,
        }
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        this.logOut = this.logOut.bind(this)
        // this.showForm = this.showForm.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        // this.createProducts = this.createProducts.bind(this)
        this.orderProduct = this.orderProduct.bind(this)
    }
    componentDidMount(){
        this.fetchProducts()
        .then(res => {
        })
        .catch(err => console.log(err))
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
                data: res.data
            })
            console.log(this.state.data)
        })
        return 
    }

    orderProduct(productName, availabul, id){
        console.log("ahsdfjhasljkdhf", productName)
        const {cookies} = this.props
        console.log('wow')
        console.log(this.state[id])
        console.log(availabul)
        console.log(this.state.itemQuantity)
        console.log(id)
        if(this.state[id] > availabul){
            console.log('fjslfsj')
            this.setState({invalidOrder: true})
        }
        else{
            const order = {
                userId: cookies.get('user'),
                itemQuantity: this.state[id],
                itemsLeft: availabul - this.state[id],
                productId: id,
                productName: productName
            }
            if(this.state[id] > 0)
            {
                axios.post('http://localhost:4000/placeOrder', order)
                .then(res => {
                    console.log(res)
                })
                this.setState({order: true})
                this.props.fetchProducts()
            }
            else{
                console.log('hello')
                this.setState({order: false})
            }
            // window.location.reload()
        }
    }
    onChangeSearchText(event) {
        this.setState({ searchText: event.target.value });
    }
    onChangeFilter(event) {
        this.setState({ filter: event.target.value });
        console.log(this.state.filter)
    }
    onChangeProductName(event) {
        this.setState({ productName: event.target.value });
    }
    onChangePrice(event) {
        this.setState({ bundlePrice: event.target.value });
    }
    onChangeItemQuantity(event, id) {
        console.log(event.target.value)
        console.log(id)
        this.setState({ [id]: event.target.value }, () => {
            console.log(this.state)
        });
    }
    onChangeQuantity(event) {
        this.setState({ bundleQuantity: event.target.value });
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
        const allProducts = this.props.data.map(product => <Product key = {product._id} item = {product} order = {this.orderProduct} onChangeItemQuantity = {this.onChangeItemQuantity} type = 'products'/>)
        return(
            <div>
                <div className = {classes.divider}>
                    <Box display="flex" flex="row" alignItems="center" justifyContent="space-between">
                        <Typography>All PRODUCTS</Typography>
                        <Box width="60%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-around">
                            <TextField
                                style={{width: '60%'}}
                                required
                                type="text"
                                id="searchText"
                                name="searchText"
                                autoComplete="searchText"
                                onChange = {this.onChangeSearchText}
                                value = {this.state.searchText}
                             />
                            <IconButton>
                                <SearchIcon onClick={this.props.fetchProducts} />
                            </IconButton>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Sort By
                                </InputLabel>
                                <NativeSelect
                                    value={this.state.filter}
                                    onChange={this.onChangeFilter}
                                >
                                    <option value="">None</option>
                                    <option value='bundlePrice'>By Price</option>
                                    <option value='ratings'>By Ratings</option>
                                    <option value='itemsLeft'>By Quantity</option>
                                </NativeSelect>

                                <IconButton>
                                    <SortIcon onClick={this.props.fetchProducts} />
                                </IconButton>

                        </Box>
                    </Box>
                    <hr size="5" style={{color: 'black', display: 'block', backgroundColor: 'black'}}></hr>
                </div>
                <div>
                    <Grid container spacing={3} alignItems="center" justify="center">
                        {allProducts}
                    </Grid>
                </div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.order}
                    autoHideDuration={6000}
                    onClose={() => {this.setState({order: false})}}
                    message="Order Placed"
                >
                    <Alert onClose={() => {this.setState({order: false})}} severity="success">
                        Order placed succesfully!!!
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.invalidOrder}
                    autoHideDuration={6000}
                    onClose={() => {this.setState({invalidOrder: false})}}
                >
                    <Alert onClose={() => {this.setState({invalidOrder: false})}} severity="error">
                        Such an order is not possible!!!
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default withCookies(withStyles(styles)(CustomerProductView));