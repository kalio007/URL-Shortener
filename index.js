var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var helmet = require('helmet');
var yup = require('yup');
const { nanoid } = require('nanoid');

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
const schema = yup.object().shape({
    alias: yup.string().trim().matches(/[a-z_-]/i),
    url: yup.string().trim().url().required(),
});

app.post('/url', async (req,res,next) => {
    const { alias, url } =req.body;
    try {
        if (!alias){
            alias = nanoid();
        }
        alias = alias.toLowerCase
        await schema.validate({
            alias,
            url,
        })
        res.json({
            alias,
            url,
        })
    } catch (error) {
        next(error)   
    }
    app.use((error, req, res, next) => {
        if (error.status) {
            res.status(error.status)
        } else {
            res.status(500)
        }
        res.json({
            message: error.message,
            stack:process.env.NODE_ENV === 'production' ? 'hey' : error.stack
        })
    })
})



const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})