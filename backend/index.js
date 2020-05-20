const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const port = process.env.PORT || 4000;
const cors = require('cors')
const routes = express.Router()

let User = require('./models/user')
let Product = require('./models/product')
let Login = require('./models/login')
let Query = require('./models/query')
let Remover = require('./models/removeProduct')
let Searcher = require('./models/searchProduct')
let Order = require('./models/order')
let Review = require('./models/review')
app.use(cors()) 
app.use(bodyParser.json())

var mongodb = "mongodb://127.0.0.1:27017/temp"
mongoose.Promise = global.Promise
mongoose.connect(mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false})
var connection = mongoose.connection
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})
connection.on('error', console.error.bind(console, "MongoDB connection error"))

routes.route('/').get(function(req, res){
    // res.send('hello world')
    res.sendFile(__dirname + '/index.html')
    console.log('hello world')
})

routes.route('/users').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

routes.route('/allProducts').get(function(req, res) {
    console.log('fetching products')
    console.log(req.body.userId)
    // let query = Query(req.body)
    Query.find( function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('sending response')
            // console.log(users)
            res.json(users);
        }
    });
});

routes.route('/searchProducts').post(function(req, res) {
    console.log('fetching products')
    console.log(req.body.productName)
    console.log(req.body.filter)
    var pp = []
    // let query = Query(req.body)
    // if(req.body.filter === 'itemsLeft')
    const {name, filter} = req.body
    if(req.body.productName === ''){
        console.log('all')
            Product.find({'readyToDispatch': false, 'dispatched': false, 'removed': false}, null, {sort: req.body.filter}, function(err, products) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('sending response')
                    console.log('fsfsf')
                    let done = 0
                    for(let i = 0; i<products.length; i++){
                        User.findOne({'_id': products[i].userId}, '', function(err, user){
                            if(user){
                                const p = {
                                    '_id': products[i]._id,
                                    'userId': products[i].userId,
                                    'vendorName': user.firstName + ' ' + user.lastName,
                                    'productName': products[i].productName,
                                    'bundlePrice': products[i].bundlePrice,
                                    'bundleQuantity': products[i].bundleQuantity,
                                    'itemsLeft': products[i].itemsLeft,
                                    'readyToDispatch': products[i].readyToDispatch,
                                    'dispatched': products[i].dispatched,
                                    'removed': products[i].removed
                                }
                                // console.log(order)
                                pp.push(p)
                                // console.log(placedOrder)
                            }
                            done++
                            if(done==products.length){
                                console.log(pp)
                                res.send(pp);
                            }
                    //         }
                        })
                        // console.log(orders[i].itemsLeft)
                    }
                    // res.json(users);
                }
            });
    }
    else{
        Product.find({'productName': req.body.productName, 'readyToDispatch': false, 'dispatched': false, 'removed': false}, null, {sort: req.body.filter}, function(err, products) {
            if (err) {
                console.log(err);
            } else {
                console.log('sending response')
                // console.log(products)
                let done = 0
                for(let i = 0; i<products.length; i++){
                    User.findOne({'_id': products[i].userId}, '', function(err, user){
                        if(user){
                            const p = {
                                '_id': products[i]._id,
                                'userId': products[i].userId,
                                'vendorName': user.firstName + user.lastName,
                                'productName': products[i].productName,
                                'bundlePrice': products[i].bundlePrice,
                                'bundleQuantity': products[i].bundleQuantity,
                                'itemsLeft': products[i].itemsLeft,
                                'readyToDispatch': products[i].readyToDispatch,
                                'dispatched': products[i].dispatched,
                                'removed': products[i].removed
                            }
                            // console.log(order)
                            pp.push(p)
                            // console.log(placedOrder)
                        }
                        done++
                        if(done==products.length){
                            console.log(pp)
                            res.send(pp);
                        }
                //         }
                    })
                    // console.log(orders[i].itemsLeft)
                }
                // res.json(pp);
            }
        });
    }
});

routes.route('/dispatchedProducts').post(function(req, res){
    console.log('fetching dispatched')
    console.log(req.body)
    var dp = []
    Product.find({'userId': req.body.userId, 'dispatched': true, 'removed': false}, '', async function(err, products){
        if(err){
            console.log(err)
        }
        else{
            let done = 0
            // console.log(products[0])
            for(let i = 0; i<products.length; i++){
                await Review.findOne({'userId': req.body.userId, 'productName': products[i].productName}, '', function(err, review){
                    console.log(review)
                    if(review){
                        // var cus = []
                        // let d = 0
                        // for(let = j=0; j<review.customers.length; j++){
                        //     User.findOne({'_id': review.customers[j]}, 'firstName lastName', function(err, user){
                        //         if(user){
                        //             cus.push(user.firstName+' '+user.lastName)
                        //         }
                        // })
                        //     // console.log(cus+'fsf')
                        //         d++
                        // }
                        // if(d==review.customers.length){
                            const product = {
                                'userId': req.body.userId,
                                'productName': products[i].productName,
                                'bundlePrice': products[i].bundlePrice,
                                'bundleQuantity': products[i].bundleQuantity,
                                'itemsLeft': products[i].itemsLeft,
                                'readyToDispatch': products[i].readyToDispatch,
                                'dispatched': products[i].dispatched,
                                'removed': products[i].removed,
                                'reviews': review.reviews,
                                'ratings': review.ratings,
                                'customers': review.customers,
                                // 'names': cus
                            }
                                dp.push(product)
                                console.log(product)
                            }
                        // }
                        // console.log('flsdjfs'+p.productName)
                })
                done++
                if(done == products.length){
                    console.log('fsdfsd'+dp)
                    res.json(dp)
                }
            }
        }
    })
})
routes.route('/getReviews').post(function(req, res){
    console.log(req.body)
    console.log('hello')
    Review.findOne({'userId': req.body.userId, 'productName': req.body.productName}, 'reviews ratings', function(err, review){
        if(err) console.log(err)
        if(review){
            console.log(review)
            res.json(review)
        }
    })
})
routes.route('/getOrders').post(function(req, res) {
    var placedOrder = []
    console.log(req.body)
    const {user, productName, filter} = req.body
    console.log('getting orders')
    console.log(req.body.userId)
    var status = ''
    if(req.body.productName === ''){
        console.log('all')
        Order.find({'userId': req.body.userId}, null, {sort: req.body.filter}, function(err, orders) {
            if (err) {
                console.log(err);
            } 
            if(orders){
                // console.log('sending respo')
                // // console.log(orders)
                let done = 0
                for(let i = 0; i<orders.length; i++){
                //     console.log(orders[i].productId)
                //     // console.log(orders[i].userId)
                    Product.findOne({'_id': orders[i].productId}, '', function(err, product){
                //         if(err){
                //             console.log(err)
                //         }
                //         else{
                            // console.log(product)
                        if(product){
                            orders[i].set('itemsLeft', product.itemsLeft)
                            if(product.removed == true){
                                console.log('hoooo')
                                status = 'canceled'
                            }
                            else if(product.itemsLeft > 0){
                                status = 'waiting'
                            }
                            else{
                                if(product.dispatched == true){
                                    status = 'dispatched'
                                }
                                else if(product.readyToDispatch == true){
                                    status = 'placed'
                                }
                            }
                            const order = {
                                '_id': product._id,
                                'vendorId': product.userId,
                                'userId': orders[i].userId,
                                'productId': orders[i].productId,
                                'productName': orders[i].productName,
                                'itemsLeft': product.itemsLeft,
                                'itemQuantity': orders[i].itemQuantity,
                                'status': status,
                                'orderId': orders[i]._id
                            }
                            // console.log(order)
                            placedOrder.push(order)
                            // console.log(placedOrder)
                        }
                        done++
                        if(done==orders.length){
                            console.log(placedOrder)
                            res.send(placedOrder);
                        }
                //         }
                    })
                    // console.log(orders[i].itemsLeft)
                }
            }
            else{
                res.send()
            }
        });
    }
    else{
        console.log(req.body.productName)
        Order.find({'userId': req.body.userId, 'productName': req.body.productName}, '', {sort: req.body.filter},     function(err, orders) {
        if (err) {
                console.log(err);
            }
            if(orders.length == 0) {
                            res.send([])
                        }
        if(orders) {
                // console.log('sending respo')
                // // console.log(orders)
                let done = 0
                for(let i = 0; i<orders.length; i++){
                //     console.log(orders[i].productId)
                //     // console.log(orders[i].userId)
                    Product.findOne({'_id': orders[i].productId}, '', function(err, product){
                //         if(err){
                //             console.log(err)
                //         }
                //         else{
                            // console.log(product)

                        if(product){
                            orders[i].set('itemsLeft', product.itemsLeft)
                            if(product.itemsLeft > 0){
                                status = 'waiting'
                            }
                            else{
                                if(product.removed == true){
                                    status = 'canceled'
                                }
                                else if(product.dispatched == true){
                                    status = 'dispatched'
                                }
                                else if(product.readyToDispatch == true){
                                    status = 'placed'
                                }
                            }
                            const order = {
                                '_id': product._id,
                                'userId': orders[i].userId,
                                'productId': orders[i].productId,
                                'productName': orders[i].productName,
                                'itemsLeft': product.itemsLeft,
                                'itemQuantity': orders[i].itemQuantity,
                                'status': status,
                                'orderId': orders[i]._id
                            }
                            // console.log(order)
                            placedOrder.push(order)
                            // console.log(placedOrder)
                        }
                        done++
                        if(done==orders.length ){
                            console.log(placedOrder)
                            res.send(placedOrder);
                        }
                //         }
                    })
                    // console.log(orders[i].itemsLeft)
                }
            }
            else{
                res.send({'userId': 'hello'})
            }
        });
    }
});

routes.route('/products').post(function(req, res) {
    console.log('fetching products')
    console.log(req.body.userId)
    let query = Query(req.body)
    Query.find({'userId': req.body.userId, 'readyToDispatch': false, 'dispatched': false, 'removed': false},'productName bundleQuantity bundlePrice itemsLeft', function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('sending response')
            console.log(users)
            res.json(users);
        }
    });
});

routes.route('/readyProducts').post(function(req, res) {
    console.log('fetching ready products')
    console.log(req.body.userId)
    let query = Query(req.body)
    Query.find({'userId': req.body.userId, 'readyToDispatch': true, 'dispatched': false, 'removed': false},'productName bundleQuantity bundlePrice itemsLeft', function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('sending response')
            console.log(users)
            res.json(users);
        }
    });
});

routes.route('/placeOrder').post(function(req, res) {
    console.log('placing order')
    // console.log(req.body.userId)
    console.log(req.body.productId)
    itemsLeft = req.body.itemsLeft
    let order = Order(req.body)
    if(itemsLeft == 0){
        Product.findByIdAndUpdate({'_id': req.body.productId}, {'itemsLeft': itemsLeft, readyToDispatch: true}, function(err, product){
            if(err){
                console.log(err)
            }
            else{
                // console.log(product)
            }
        })
        order.save()
        .then(res => {
                console.log('order placed')
                console.log(res)
        });
    }
    else{
        Product.findByIdAndUpdate({'_id': req.body.productId}, {'itemsLeft': itemsLeft}, function(err, product){
            if(err){
                console.log(err)
            }
            else{
                // console.log(product)
            }
        })
        order.save()
        .then(res => {
                console.log('order placed')
                console.log(res)
        });
    }
})

routes.route('/saveReview').post(function(req, res) {
    console.log('saving review')
    // console.log(req.body.userId)
    // console.log(req.body.productId)
    // itemsLeft = req.body.itemsLeft
    // if(itemsLeft == 0){
    console.log(req.body)
    Review.findOneAndUpdate({'productName': req.body.productName, 'userId': req.body.vendorId}, {$push : {reviews: req.body.review, ratings: req.body.rating, customers: req.body.customerId}}, function(err, review){
        if(err){
            console.log(err)
        }
        else{
            console.log('wo woo')
        }
    })
    //     order.save()
    //     .then(res => {
    //             console.log('order placed')
    //             console.log(res)
    //     });
    // }
    // else{
    //     Product.findByIdAndUpdate({'_id': req.body.productId}, {'itemsLeft': itemsLeft}, function(err, product){
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             // console.log(product)
    //         }
    //     })
    //     order.save()
    //     .then(res => {
    //             console.log('order placed')
    //             console.log(res)
    //     });
    // }
})

routes.route('/editOrder').post(function(req, res) {
    console.log('editing order')
    // console.log(req.body.userId)
    itemsLeft = req.body.itemsLeft
    console.log(req.body.orderId)
    console.log(req.body.productId)
    // let order = Order(req.body)
    if(itemsLeft == 0){
        Product.findByIdAndUpdate({'_id': req.body.productId}, {'itemsLeft': itemsLeft, readyToDispatch: true}, function(err, product){
            if(err){
                console.log(err)
            }
            else{
                // console.log(product)
            }
        })
        // order.save()
        // .then(res => {
        //         console.log('order placed')
        //         console.log(res)
        // });
        Order.findByIdAndUpdate({'_id': req.body.orderId}, {'itemQuantity': itemQuantity}, function(err, order){
            if(err) console.log(err)
        })
    }
    else{
        Product.findByIdAndUpdate({'_id': req.body.productId}, {'itemsLeft': itemsLeft}, function(err, product){
            if(err){
                console.log(err)
            }
            else{
                // console.log(product)
            }
        })
        // order.save()
        // .then(res => {
        //         console.log('order placed')
        //         console.log(res)
        // });
        Order.findByIdAndUpdate({'_id': req.body.orderId}, {'itemQuantity': req.body.itemQuantity}, function(err, product){
            // if(err) console.log(err)
            console.log('helo')
        })
    }
})

routes.route('/removeProduct').post(function(req, res) {
    console.log('fetching products')
    console.log(req.body.userId)
    let query = Remover(req.body)
    Product.findByIdAndUpdate(req.body.productId, {'removed': true}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log('sending response')
            console.log(users)
            res.json(users);
        }
    });
});

routes.route('/dispatchProduct').post(function(req, res) {
    console.log('dispatching products')
    console.log(req.body.userId)
    // let query = Remover(req.body)
    Product.findByIdAndUpdate(req.body.productId, {'dispatched': true}, function(err, products) {
        if (err) {
            console.log(err);
        } 
        // else {
        //     console.log('sending response')
        //     console.log(users)
        //     res.json(users);
        // }
    });
});

routes.route("/signup").post(function(req, res) {
    console.log('why it')
    console.log(req.body)
    let user = new User(req.body);
    User.findOne({'email': req.body.email}, 'email', function(err, person){
        if(err) return handleError(err);
        if (person){
            console.log('email already exists')
            res.status(200).send('Email address already registered')
        }
        else{
            console.log('success')
            user.save()
            .then(item => {
                res.set('Content-Type', 'text/plain')
                res.status(200).send('user added');
            })
            // .catch(err => {
            //     res.status(400).send('Error');
            // });
            // res.redirect('/')           
        }
    })
});

routes.route("/addProduct").post(function(req, res) {
    console.log('adding product')
    console.log(req.body)
    let product = new Product(req.body);
    let review = Review({
        'userId': req.body.userId,
        'productName': req.body.productName,
        rating: [],
        reviews: [],
        customers: []
    })
    Product.findOne({'productName': req.body.productName, 'userId': req.body.userId}, 'productName', function(err, prod){
        if(err) return handleError(err);
        console.log('success')
        review.save()
        product.save()
        .then(item => {
            res.set('Content-Type', 'text/plain')
            res.status(200).send('product added');
        })
    })
});

routes.route("/login").post(function(req, res){
    console.log("logging in")
    let user = Login(req.body)
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.body.passwordHash)
    Login.findOne({'email': req.body.email, 'passwordHash': req.body.passwordHash}, '_id firstName type', function(err, person){
        console.log('querying db')
        console.log(person)
        if(err) return handleError(err);
        if(person){
            console.log('valid user')
            res.status(200).json(person)
        }
        else{
            console.log('user not found')
            // res.set('Content-Type', 'json')
            res.status(200).json({"firstName": "Invalid Credentials"})
        }
    })
})
// app.use(bodyParser.urlencoded({extended: true}))
app.use('/', routes)
app.listen(port, function(){
	console.log('on port 4000')
})