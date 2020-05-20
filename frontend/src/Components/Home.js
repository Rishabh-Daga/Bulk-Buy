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
import Vendor from './Vendor.js'
import Customer from './Customer.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

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
    // toolbar: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexDirection: 'row',
    //   justifyContent: 'spaceAround'
    // }
  });

class Home extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props){
        super(props)
        const { cookies } = props
        console.log(cookies.get('loggedIn'))
        this.state = {
            loggedIn: cookies.get('loggedIn'),
            customer: cookies.get('customer'),
            vendor: cookies.get('vendor')
        }
        this.logOut = this.logOut.bind(this)
    }
    logOut(){
        const {cookies} = this.props
        cookies.remove('user')
        cookies.remove('loggedIn')
        cookies.remove('customer')
        cookies.remove('vendor')
        this.props.history.push('/')
        window.location.reload()
    }
    render(){
        const {classes} = this.props
        if(this.state.loggedIn == 'true'){
        console.log('fdslfjlsj')
        console.log('customer'+this.state.customer)
        console.log('vendor'+this.state.vendor)
            if(this.state.customer == 'true'){
                console.log('hello')
                return(
                    // <AppBar position="static">
                    //     <Toolbar>
                    //     {/* <IconButton edge="start" color="red" aria-label="menu">
                    //         <MenuIcon /> */}
                    //     {/* </IconButton> */}
                    //     <Typography variant="h6" className={classes.title} style={{flex: 1}}>
                    //         Home
                    //     </Typography>
                    //     <Link>
                    //         <Button color="inherit" className='float-right' onClick = {this.logOut}>Sign Out</Button>
                    //     </Link>
                    //     </Toolbar>
                    //     <Button>hello</Button>
                    // </AppBar>
                    <Customer />
                )
            }
            else{
                return(
                    <Vendor />
                )
            }
        }
        else{
            return(
                <AppBar position="static">
                    <Toolbar>
                    {/* <IconButton edge="start" color="red" aria-label="menu">
                        <MenuIcon /> */}
                    {/* </IconButton> */}
                    <Typography variant="h6" className={classes.title} style={{flex: 1}}>
                        Home
                    </Typography>
                    <Link to='/register'>
                        <Button color="inherit" className='float-right' onClick = "()">Register</Button>
                    </Link>
                    <Link to='/login'>
                        <Button color="inherit" className='float-right' onClick = "()">Sign In</Button>
                    </Link>
                    </Toolbar>
                </AppBar>
            )
        }
    }
}

export default withCookies(withStyles(styles)(Home));