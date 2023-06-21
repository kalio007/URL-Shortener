var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var helmet = require('helmet');
var yup = require('yup');
var monk = require('monk')
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
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
  });
  
  app.post('/url', async (req, res, next) => {
    let { slug, url } = req.body;
    try {
      throw new Error('Url shortening is no longer open to the public.');
      await schema.validate({
        slug,
        url,
      });
      if (url.includes('cdg.sh')) {
        throw new Error('Stop it!');
      }
      if (!slug) {
        slug = nanoid(5);
      } else {
        const existing = await urls.findOne({ slug });
        if (existing) {
          throw new Error('Slug in use. 🍔');
        }
      }
      slug = slug.toLowerCase();
      const newUrl = {
        url,
        slug,
      };
      const created = await urls.insert(newUrl);
      res.json(created);
    } catch (error) {
      next(error);
    }
  });
  
  app.use((req, res, next) => {
    res.status(404).sendFile(notFoundPath);
  });
  
  app.use((error, req, res, next) => {
    if (error.status) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? 'hey' : error.stack,
    });
  });



const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})