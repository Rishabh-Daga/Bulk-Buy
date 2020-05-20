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
import CardContent from '@material-ui/core/CardContent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Container, Card } from '@material-ui/core';
import Product from './Product.js'

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
        // color: 'blue'
        // backgroundColor: '#e8e2d3',
        // background: 'linear-gradient(45deg, #CE0B80 30%, #FF8E53 90%)'
    },
    card: {
        // background: 'linear-gradient(90deg, #02acbf 30%, #046c78 90%)'
    }
    // toolbar: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexDirection: 'row',
    //   justifyContent: 'spaceAround'
    // }
  });


  class VendorProductView extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props){
        super(props)
        const { cookies } = props
        console.log(cookies.get('loggedIn'))
        this.state = {
            showMyComponent: false,
            view: 'products',
            loggedIn: cookies.get('loggedIn'),
            customer: cookies.get('customer'),
            vendor: cookies.get('vendor'),
            productName: '',
            bundlePrice: 0,
            bundleQuantity: 0,
            userId: cookies.get('user'),
            data: [],
            products: []
        }
        // this.onChangeProductName = this.onChangeProductName.bind(this);
        // this.onChangePrice = this.onChangePrice.bind(this);
        // this.onChangeQuantity = this.onChangeQuantity.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.logOut = this.logOut.bind(this)
        // this.showForm = this.showForm.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
    }
    removeProduct(productName){
        const {cookies} = this.props
        const product = {
            productId: productName,
            userId: cookies.get('user')
        }
        var post = axios.post('http://localhost:4000/removeProduct', product)
        .then(res => {
            console.log(res.data)
            // window.location.reload()
            this.fetchProducts()
        })
    }
    componentDidMount(){
        this.fetchProducts()
        .then(res => {
            // this.setState({
            //     data: res.body,
            // })
        })
        .catch(err => console.log(err))
        // this.showProducts()
        // console.log(this.products)
    }
    
    fetchProducts = async() => {
        const {cookies} = this.props
        const product = {
            userId: cookies.get('user')
        }
        var post = axios.post('http://localhost:4000/products', product)
        .then(res => {
            console.log(res.data.length)
            this.setState({
                data: res.data
            })
        })
        // this.showProducts()
        return 
    }

    render(){
        const {classes} = this.props
        const bull = <span className={classes.bullet}>•</span>;
        const allProducts = this.state.data.map(product => <Product key = {product._id} item = {product} remove = {this.removeProduct} action = 'Remove'/>)
        return(
            <div>
                <div className = {classes.divider}>
                    <Typography>YOUR PRODUCTS</Typography>
                    <hr size="5" style={{color: 'black', display: 'block', backgroundColor: 'black'}}></hr>
                </div>
                <div>
                    <Grid container spacing={3} alignItems="center" justify="center">
                        {allProducts}
                    </Grid>
                </div>
            </div>
        )
    }
  }
  export default withCookies(withStyles(styles)(VendorProductView));