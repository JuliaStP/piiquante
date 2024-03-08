//mongodb link: mongodb+srv://<username>:<password>@clusterpiiquante.s8tanyd.mongodb.net/?retryWrites=true&w=majority&appName=clusterPiiquante
//mongodb password: 10Marina

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
// const Thing = require('./models/thing');
const app = express();
app.use(bodyParser.json()); 



mongoose.connect('mongodb+srv://andreevajulia:10Marina@clusterpiiquante.s8tanyd.mongodb.net/?retryWrites=true&w=majority&appName=clusterPiiquante')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', stuffRoutes);
app.use('/api/auth', userRoutes);


//   app.get('/api/stuff', (req, res, next) => {
//     Thing.find().then(
//       (things) => {
//         res.status(200).json(things);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });


//   app.post('/api/stuff', (req, res, next) => {
//     const thing = new Thing({
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       price: req.body.price,
//       userId: req.body.userId
//     });
//     thing.save().then(
//       () => {
//         res.status(201).json({
//           message: 'Post saved successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });

// app.use((req, res, next) => {
//   console.log('Request received!');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Your request was successful!' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Response sent successfully!');
// });

module.exports = app;