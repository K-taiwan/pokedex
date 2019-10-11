//--------------------------------SETUP
// external modules
const express = require('express');
const bodyParser = require('body-parser');
// internal modules
const db = require("./models");
// instanced module
const app = express();

//--------------------------------MIDDLEWARE

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-------------------------------CONFIGURATION VARIABLES
const PORT = process.env.PORT || 3000;

// ------------------------------ROUTES

//SECTION  View Routes
app.get('/',  (req, res) => {
  // const file = `${__dirname}/views/index.html`
  res.sendFile('views/index.html' , { root : __dirname});
});

// route, callback function(request,response)
// app.get('route', function(request, response))
app.get('/api/v1', (req,res) =>{
  res.json({
    status:200,
    message: 'Welcome to the Pokedex Api.',
    endpoints:[
      {
        method: 'GET',
        path: '/api/v1',
        description: 'Describes all available endpoints.'
      }
    ]
  });
});

//SECTION  Pokemon Routes

// Index route
app.get('/api/v1/pokemon', (req,res)=>{
  db.Pokemon.find({},(error,allPokemon)=>{
    if(error) return console.log(error);
    res.json({
      status: 200,
      count: allPokemon.length,
      data: allPokemon,
      requestedAt: new Date().toLocaleString()
    });
  });
});

// Show route
app.get('/api/v1/pokemon/:name', (req,res)=>{
  db.Pokemon.findOne({name:req.params.name}, (error, foundPokemon)=>{
    if(error) return console.log(error);
    res.json({
      status: 200,
      data: foundPokemon,
      requestedAt: new Date().toLocaleString()
    });
  });
});

//TODO get all trainers that have a specific Pokemon

// Create route
app.post('/api/v1/pokemon', (req,res)=>{
  db.Pokemon.create(req.body, (error, createdPokemon)=>{
    if (error) return console.log(error);
    res.json({
      status: 201,
      data: createdPokemon,
      requestedAt: new Date().toLocaleString()
    });
  });
});

//SECTION  Trainer Routes

// Index Route
app.get('/api/v1/trainers', (req,res)=>{
  db.Trainer.find({})
    .populate('pokemon')
    .exec((error, allTrainers)=>{
      if(error) return console.log(error);
      res.json({
        status:200,
        count: allTrainers.length,
        data: allTrainers,
        requestedAt: new Date().toLocaleString()
      });
    })
});

//TODO Dynamic Update Route

// Create Route
app.post('/api/v1/trainers', (req,res)=>{
  db.Trainer.create(req.body, (error, createdTrainer)=>{
    if (error) return console.log(error);
    res.json({
      status: 201,
      data: createdTrainer,
      requestedAt: new Date().toLocaleString()
    });
  });
});

//TODO get all trainers that have a specific Badge


// ------------------------------Start Server
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/`));
