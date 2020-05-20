import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
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
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import StyledRadio from '@material-ui/core/Radio';
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

class SignUp extends Component{
  static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  }
  constructor(props){
    super(props);
    this.state = {
      // classes: useStyles(),
      // history: useHistory(),
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      error: '',
      type: 'customer'
    }
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.userType = this.userType.bind(this);
  }
  userType(event){
    this.setState({type: event.target.value})
  }
  goToLogin(event) {
    this.props.history.push('/login')
  }
  onChangeFirstname(event) {
      this.setState({ firstName: event.target.value });
  }
  onChangeLastname(event) {
      this.setState({ lastName: event.target.value });
  }
  onChangeEmail(event) {
      this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
      this.setState({ password: event.target.value });
  }

  goToRegister(event) {
      this.props.history.push('/register')
  }
  onSubmit(e) {
    e.preventDefault();
    const {cookies} = this.props
    const newUser = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        passwordHash: sha1(this.state.password+'secret'),
        password: this.state.password,
        type: this.state.type
    }
    if(newUser['email'] !== '' && newUser['firstName'] !== '' && newUser['lastName'] !== '' && newUser['password'] !== '')
    {
      this.setState({
        error: ''
      })
      axios.post('http://localhost:4000/signup', newUser)
        .then(res => {
          console.log(res.data)
          this.setState({
            error: res.data,
          })
          if(res.data == 'user added'){
            cookies.set('loggedIn', true)
            if(this.state.type == 'customer'){
              cookies.set('customer', true)
              cookies.set('vendor', false)
            }
            else{
              cookies.set('customer', false)
              cookies.set('vendor', true)
            }
            this.props.history.push('/')
            window.location.reload()
          }
      });
      this.setState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    }
    else
    {
      this.setState({
        error: '*Please fill all mandatory fields'
      })
      this.setState({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: ''
      });
    }

  }
  render(){
    const { classes } = this.props;
    // const {history} = this.props;
  return (
    <Container>
      <Container component="header" maxWidth="100%">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="white" aria-label="menu" onClick = {() => {this.props.history.goBack()}}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{flex: 1}}>
            Register
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange = {this.onChangeFirstname}
                value = {this.state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange = {this.onChangeLastname}
                value = {this.state.lastName}
              />
            </Grid>
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
              />
            </Grid>
            <Grid item xs = {12}>
            <FormLabel component="legend">You Are a </FormLabel>
            <RadioGroup defaultValue={this.state.type} aria-label="gender" name="customized-radios" onChange = {this.userType}>
              <FormControlLabel value="customer" control={<StyledRadio />} label="Customer" />
              <FormControlLabel value="vendor" control={<StyledRadio />} label="Vendor" />
            </RadioGroup>
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.onSubmit}
          >
            Sign Up
          </Button>
          <div fullWidth style={{color: "red"}}>{this.state.error}</div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login'>
                <Button onClick = {this.goToLogin}>Already have an account? Sign in</Button>
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
  );
  }
}

export default withCookies(withStyles(styles)(SignUp));