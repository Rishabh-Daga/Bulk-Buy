import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import SignUp from './Components/signUp.js'
import LogIn from './Components/LogIn.js'
import Home from './Components/Home.js'
import { useCookies } from 'react-cookie';
import cookie from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CustomerOrders from './Components/CustomerOrders.js'
import { useHistory } from 'react-router-dom';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const useStyles = makeStyles(theme => ({
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
}));
function App(props){
  const classes = useStyles();
  const[cookies, setCookie, removeCookie] = useCookies(['loggedIn'])
  // setCookie('loggedIn', false)
  // removeCookie('loggedIn')
  // cookie.save("loggedIn", true, {path: '/'})
    // removeCookie('customer')
    // removeCookie('loggedIn')
    // removeCookie('vendor')
    return (
      <Router>
      <div>
      {/* <AppBar position="static">
        <Toolbar> */}
          {/* <IconButton edge="start" color="red" aria-label="menu">
            <MenuIcon /> */}
          {/* </IconButton> */}
          {/* <Typography variant="h6" className={classes.title} style={{flex: 1}}>
            Home
          </Typography>
          <Link to='/signup'>
            <Button color="inherit" className='float-right' onClick = "()">Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar> */}
      {/* // <div className = 'App'>
      //   <h1>hello world of react</h1>
      // </div> */}
      <Switch>
          <Route exact path="/" component = {Home} />
            {/* <Home />
          </Route> */}
          <Route path="/register" component={SignUp}>
            {/* <Register /> */}
          </Route>
          <Route path="/login" component={LogIn} />
          {/* <Route path="/orders" component={CustomerOrders} /> */}
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </div>
      </Router>
    )
}

// function Home(){
//   const classes = useStyles()
//   return (
//     <AppBar position="static">
//         <Toolbar>
//           {/* <IconButton edge="start" color="red" aria-label="menu">
//             <MenuIcon /> */}
//           {/* </IconButton> */}
//           <Typography variant="h6" className={classes.title} style={{flex: 1}}>
//             Home
//           </Typography>
//           <Link to='/register'>
//             <Button color="inherit" className='float-right' onClick = "()">Register</Button>
//           </Link>
//           <Link to='/login'>
//             <Button color="inherit" className='float-right' onClick = "()">Sign In</Button>
//           </Link>
//         </Toolbar>
//       </AppBar>
//   )
// }

// function Register(){
//   return (
//     <SignUp />
//   )
// }
// ReactDOM.render(< />, document.getElementById('root'));
export default App;