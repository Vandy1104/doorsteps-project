const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects

const port = 3000; //set server port

//connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/test?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});


//including body-parser, cors, bcryptjs
app.use((req, res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();
});

//prints message on load testing
app.get('/', (req, res) => res.send('Kudos Vandy! Backend working..'));

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

//viewing users
app.get('/property-report', (req,res) => {
	User.find().then(result =>{
		res.send(result);
	});
});

// Adding a user
// app.post('/addUser', (req,res)=>{
// 	//checking if user is found in the db already
//  User.findOne({firstName:req.body.firstName},(err,userResult)=>{
//
// 	 if (userResult){
// 		 res.send('user added already');
// 	 } else {
//        const user = new User({
//          _id : new mongoose.Types.ObjectId,
//          firstName : req.body.firstName,
//          lastName : req.body.lastName,
//          email : req.body.email,
//          phone : req.body.phone
// 				   });
//        	 user.save().then(result =>{
//          res.send(result);
//        }).catch(err => res.send(err));
// 		 	}
// 		})  //test
// 		 });


app.post('/addUser', (req, res)=>{
  console.log("hiiiiiiiiiiii", req.body);

  //checking if user is found in the db already.
  User.findOne({firstName:req.body.firstName},(err, userResult)=>{
    if(userResult){
      res.send('Product entered already, Please add another one')
    } else {
      //const hash = bcryptjs.hashSync(req.body.password);
      const user = new User({
        _id : new mongoose.Types.ObjectId,
        radioInput:req.body.radioInput,
        firstName  : req.body.firstName,
        lastName : req.body.lastName,
        address:req.body.address,
        email : req.body.email,
        phone : req.body.phone,

        // password  : hash
      });
      //Save to database and notify the user accordingly
      user.save().then(result =>{
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
});  //Post

     //keep this always at the bottom so that you can see the errors reported
     app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
