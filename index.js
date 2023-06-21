var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var helmet = require('helmet');
var yup = require('yup')

var app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// app.post('/url/:id', (req,res) => {
//     //todo: get a short url form id
// })
// app.get('/', (req,res) => {
//     res.json({
//         message: 'cdg.sh hey '
//     })
// })
// // when you make a request to anything we return the below
// app.get('/:id', (req,res) => {
//     //todo: redirect to url
// })

// // to post
// app.post('/url', (req,res) => {
//     //todo: create a short url
// })



const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})