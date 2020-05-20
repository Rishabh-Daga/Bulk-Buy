import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {useCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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

  }
});

class LogIn extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
  constructor(props){
    super(props);
    const {cookies} = props
    cookies.set('loggedIn', false, {path: '/'})
    cookies.set('vendor', false, {path: '/'})
    cookies.set('customer', false, {path: '/'})
    this.state = {
      // classes: useStyles(),
      // history: useHistory(),
      email: '',
      password: '',
      error: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
  }

  goToRegister(event) {
      this.props.history.push('/register')
  }
  onChangeEmail(event) {
      this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
      this.setState({ password: event.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const {cookies} = this.props
    const newUser = {
        email: this.state.email,
        passwordHash: sha1(this.state.password.toString()+'secret'),
        password: this.state.password.toString()
    }
    if(newUser['email'] !== '' && newUser['password'] !== '')
    {
        this.setState({
            error: ''
        })
        var post = axios.post('http://localhost:4000/login', newUser)
            .then(res => {
                console.log(res.data)
                if (res.data.firstName === "Invalid Credentials"){
                    this.setState({
                        email: this.state.email,
                        password: ''
                    })
                    cookies.set('loggedIn', false,  {maxAge: 3000})
                }
                else{
                    this.setState({
                        email: '',
                        password: ''
                    })
                    cookies.set('user', res.data._id, {maxAge: 3000})
                    cookies.set('loggedIn', true,  {maxAge: 3000})
                    if(res.data.type == 'customer'){
                      cookies.set('customer', true,  {maxAge: 3000})
                      cookies.set('vendor', false,  {maxAge: 3000})
                    }
                    else{
                      cookies.set('customer', false,  {maxAge: 3000})
                      cookies.set('vendor', true,  {maxAge: 3000})
                    }
                    this.props.history.push('/')
                }
                this.setState({
                error: res.data.firstName,
                })
                return res.data.firstName
            });
    }
    else
    {
      this.setState({
        error: '*Please fill all mandatory fields'
      })
      this.setState({
          email: this.state.email,
          password: ''
      });
    }

  }
  render(){
    const { classes } = this.props;
  return (
      <Router>
    <Container>
      <Container component="header" maxWidth="100%">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="white" aria-label="menu" onClick = {() => {this.props.history.goBack()}}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{flex: 1}}>
            Sign In
          </Typography>
          <Link to='/register'>
            <Button color="inherit" className='float-right' onClick = "()">Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
      </Container>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {this.onChangeEmail}
                value = {this.state.email}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {this.onChangePassword}
                value = {this.state.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.onSubmit}
          >
            Sign In
          </Button>
          <div fullWidth style={{color: "red"}}>{this.state.error}</div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/register'>
                <Button onClick = {this.goToRegister}>Don't have an account? Register here</Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </Container>
    <Switch>
        {/* <Route exact path="/">
        <Home />
        </Route> */}
        {/* <Route exact path="/register" component={SignUp} /> */}
        {/* <Register /> */}
        {/* <Route path="/login" component={LogIn} /> */}
        {/* <Route path="/dashboard">
        <Dashboard />
        </Route> */}
    </Switch>
    </Router>
  );
  }
}

export default withCookies(withStyles(styles)(LogIn));