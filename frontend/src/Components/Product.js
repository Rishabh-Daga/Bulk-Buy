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
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Container, Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

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
    },
    review: {
      minHeight: '50px',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1, 1, 1),
      margin: theme.spacing(1, 1, 1)
    }
    // toolbar: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexDirection: 'row',
    //   justifyContent: 'spaceAround'
    // }
});

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {    
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};
  
class Product extends Component{
    constructor(){
        super()
    }
    render(){
        var group = []
        const {classes} = this.props
        // console.log(this.props.item.reviews)
        var reviews = ''
        if(this.props.action === 'Dispatched'){
          for(let i=0; i<this.props.item.reviews.length;i++){
            group.push({'review': this.props.item.reviews[i], 'rating': this.props.item.ratings[i], 'customer': this.props.item.customers[i]})
          }
          reviews = group.map(review => 
            <Paper className={classes.review}>
              <Box display='flex' flexDirection='column' minHeight='150px' justifyContent='space-around'>
              <Typography>
                <b>Customer Review</b>
              </Typography>
              <Typography>{review.review}</Typography>
              <Rating
              name="customized-icons"
              defaultValue={review.rating}
              // getLabelText={value => customIcons[value].label}
              IconContainerComponent={IconContainer}
              readOnly />
              </Box>  
            </Paper>)
          // ratings = this.props.item.ratings.map(rating => 
        }
        return(
            <Grid item xs={5} className={classes.divider}>
                <Card className={classes.root, classes.card}>
                    <CardContent>
                        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.state.data[i].productName}
                        </Typography> */}
                        <Typography variant="h5" component="h2">
                            {this.props.item.productName}
                        </Typography>
                        {/* <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography> */}
                        <Typography variant="body2" component="p">
                            Bundle Price: {this.props.item.bundlePrice}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Bundle Quantity: {this.props.item.bundleQuantity}
                        </Typography>
                        <Typography variant="body2" component="p"  style={this.props.action === 'Remove' ? {} : {display: 'none'}}>
                            Items Left: {this.props.item.itemsLeft}
                        </Typography>
                        <Typography style={this.props.action === 'Dispatched' ? {} : {display: 'none'}}>
                          Product Reviews: 
                          <Box display='flex' alignItems='start' justifyContent='space-around' flexWrap='wrap' flexDirection='row'>
                            {reviews}
                          </Box>
                        </Typography>
                        {/* <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography> */}
                    </CardContent>
                    <CardActions>
                        <Button size="small" style={{color: "red"}} onClick = {() => {this.props.remove((this.props.item._id))}} style={this.props.action !== 'Dispatched'? {} : {display:'none'}}>{this.props.action}</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(styles)(Product)