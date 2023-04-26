const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3001
const createError = require('http-errors')



// view engine setup
app
    .set('views', path.resolve(__dirname, './views'))
    .set('view engine', 'ejs');

  
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app
    .use(express.static(path.resolve(__dirname, '../public')))
    .use(express.urlencoded({ extended: false }))
    .use(methodOverride('_method'))
    app.use(express.json())
const {actorsRouter,genresRouter,moviesRouter} = require('./v1/routes')

app
   .use('/api/v1/actors',actorsRouter)
   .use('/api/v1/genres',genresRouter)
   .use('/api/v1/movies',moviesRouter)

   
app.use(function (req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({
      ok: false,
      status: err.status || 500,
      msg: err.message || "ups, hubo un error",
    });
  });


//Activando el servidor desde express
app.listen(port, () =>  console.log(`Server Running in: http://localhost:${port}`));
