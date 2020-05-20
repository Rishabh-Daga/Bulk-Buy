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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Rating from '@material-ui/lab/Rating'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Container, Card , Box} from '@material-ui/core';

function getSteps() {
    return ['Waiting', 'Placed', 'Dispatched'];
}

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
    action: {
        float: 'right'
    },
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
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
        this.state = {
            quantity: 0,
            statusIndex: 0,
            reviewShow: false,
            data: [],
            ratings: []
        }
        this.hideReview = this.hideReview.bind(this)
        this.showReviews = this.showReviews.bind(this)
    }
    componentDidMount(){
        if(this.props.status === 'waiting'){
            this.setState({statusIndex: 0})
        }
        else if(this.props.status === 'placed'){
            this.setState({statusIndex: 1})
        }
        else if(this.props.status === 'dispatched'){
            this.setState({statusIndex: 2})
        }
        // this.showReviews()
        // this.getVendorRating()
    }
    getVendorRating(userId, productName){
        const query = {
            userId: userId,
            productName: productName
        }
        axios.post('http://localhost:4000/getReviews', query)
        .then(res => {
            this.setState({
                data: res.data.reviews,
                ratings: res.data.ratings
            }, () => {
                console.log(res.data)
                console.log(this.state.data)
                console.log(this.state.ratings)
            })
        })
        this.setState({reviewShow: true})
    }
    showReviews(userId, productName){
        const query = {
            userId: userId,
            productName: productName
        }
        axios.post('http://localhost:4000/getReviews', query)
        .then(res => {
            this.setState({
                data: res.data.reviews,
                ratings: res.data.ratings
            }, () => {
                console.log(res.data)
                console.log(this.state.data)
                console.log(this.state.ratings)
            })
        })
        this.setState({reviewShow: true})
    }
    hideReview(){
        this.setState({reviewShow: false})
    }
    render(){
        const {classes} = this.props
        const steps = getSteps()
        var activeStep = 0
        let vendoravg = 0
        for(let i=0;i<this.state.ratings.length;i++){
            vendoravg += this.state.ratings[i]
        }
        // vendoravg /= this.state.ratings.length
        const reviews = this.state.data.map((rr, index) => 
            <p>{rr}</p>
        )
        console.log(this.props.item.status)
        if(this.props.item.status === 'waiting') activeStep = 1
        else if(this.props.item.status === 'placed') activeStep = 2
        else if(this.props.item.status === 'dispatched') activeStep = 3
        return(
            <Grid item xs={5} className={classes.divider}>
                <Card className={classes.root, classes.card}>
                    <CardContent>
                        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.state.data[i].productName}
                        </Typography> */}
                        <div style={this.props.type === 'products' ? {} : {display: 'none'}}>
                            <Box display="flex" alignItems="center" flexDirection="row" justifyContent="space-around">
                                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
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
                                    <Typography variant="body2" component="p">
                                        Items Left: {this.props.item.itemsLeft}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Vendor: <Button onClick = {() => this.showReviews(this.props.item.userId, this.props.item.productName)}>{this.props.item.vendorName}</Button>
                                        {vendoravg}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        id="itemQuantity"
                                        label="Item Quantity"
                                        name="itemQuantity"
                                        autoComplete="itemQuantity"
                                        // min='0'
                                        // max={this.props.itemsLeft}
                                        onChange = {(event) => this.props.onChangeItemQuantity(event, this.props.item._id)}
                                        value = {this.props.itemQuantity}
                                        // value = {quantity}
                                    />
                                </Box>
                            </Box>
                        </div>

                        <div style={this.props.type === 'orders' ? {} : {display: 'none'}}>
                            <Box display="flex" alignItems="center" flexDirection="row" justifyContent="space-around">
                                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
                                    <Typography variant="h5" component="h2">
                                        {this.props.item.productName}
                                    </Typography>
                                    {/* <Typography className={classes.pos} color="textSecondary">
                                    adjective
                                    </Typography> */}
                                    {/* <Typography variant="body2" component="p">
                                        Status: {this.props.item.status}
                                    </Typography> */}
                                    <div style={this.props.item.status === 'waiting' ? {} : {display: 'none'}}>
                                        <Typography variant="body2" component="p">
                                            Items left: {this.props.item.itemsLeft}
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" component="p">
                                        You Ordered: {this.props.item.itemQuantity}
                                    </Typography>
                                </Box>
                                <div display='flex' flexDirection='column' alignItems="center" justifyContent="space-evenly">
                                    <div className={classes.root}style={this.props.item.status !== 'canceled' ? {} : {display: 'none'}} >
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {steps.map(label => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                            ))}
                                            {/* <Step>
                                                <StepLabel>wowo</StepLabel>
                                            </Step> */}
                                        </Stepper>
                                    </div>
                                    <div className={classes.root} style={this.props.item.status === 'canceled' ? {} : {display: 'none'}}>
                                        <CancelIcon style={{color:"red"}}></CancelIcon>
                                        <Step>
                                            <StepLabel>Canceled</StepLabel>
                                        </Step>
                                    </div>
                                    <div style={this.props.item.status === 'waiting' ? {} : {display: 'none'}}>
                                        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                type="number"
                                                id="itemQuantity"
                                                label="Change Item Quantity"
                                                name="itemQuantity"
                                                autoComplete="itemQuantity"
                                                // min='0'
                                                // max={this.props.itemsLeft}
                                                onChange = {(event) => this.props.onChangeItemQuantity(event, this.props.item._id)}
                                                value = {this.props.itemQuantity}
                                                // value = {quantity}
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </CardContent>
                    <CardActions className={classes.action}>
                        <span style = {this.props.type === 'products' ? {} : {display: 'none'}}>
                            <Button size="small" style={{color: "blue"}} onClick = {() => this.props.order(this.props.item.productName, this.props.item.itemsLeft, this.props.item._id)} >Place Order</Button>
                        </span>
                        <span style = {this.props.type === 'orders' && this.props.item.status === 'waiting'? {} : {display: 'none'}}>
                            <Button size="small" style={{color: "blue"}} onClick = {() => this.props.order(this.props.item.orderId, this.props.item.productName, this.props.item.itemsLeft, this.props.item._id, this.props.item.itemQuantity)} >Edit Order</Button>
                        </span>
                        <span style = {this.props.type === 'orders' && this.props.item.status === 'dispatched'? {} : {display: 'none'}}>
                            <Button size="small" style={{color: "blue"}} onClick = {() => this.props.changeReview('true')} >Give Review</Button>
                        </span>
                    </CardActions>
                </Card>
                <Dialog open = {this.props.review} onClose={() => this.props.changeReview('false')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Review</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Write a review for this product
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write a Review"
                        type="text"
                        value = {this.props.reviewText}
                        onChange = {this.props.onChangeReview}
                        fullWidth
                    />
                    <DialogContentText>
                        How would you rate this products
                    </DialogContentText>
                    <Rating
                    name="customized-icons"
                    // defaultValue={this.props.satsified}
                    value = {this.props.satisfied}
                    // getLabelText={value => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    onChange = {this.props.onChangeSatisfaction}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.props.changeReview('false')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.saveReview(this.props.item.productName, this.props.item.vendorId)} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.reviewShow} onClose={() => this.hideReview()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Customer Reviews</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Customer Reviews for this product
                    </DialogContentText>
                    {reviews}
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write a Review"
                        type="text"
                        value = {this.props.reviewText}
                        onChange = {this.props.onChangeReview}
                        fullWidth
                    /> */}

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.hideReview()} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

export default withStyles(styles)(Product)