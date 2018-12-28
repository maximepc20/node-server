const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs')

const portNumber = process.env.PORT || 3000;
const maintenance = false;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        console.log('Unable to append to server: ', err);
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
    if(maintenance)
    {
        res.render('maintenance.hbs', { });
    }
    else {
        next();
    }
});

app.use(express.static(__dirname+ '/public_html'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() ;
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle : 'Bienvenue',
        pageMessage: 'Ce site est fait avec NODE.JS'
    });
});

app.get('/json', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Maxime',
        likes: [
            'Kayak',
            'Piano'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About page',
        pageMessage: 'About this website'
    });
})

app.get('/folio', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'Folio page',
        pageMessage: 'My Portfolio'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Oups! There\'s no page here'
    });
})

app.listen(portNumber, () => {
    console.log('Server is up on port ', portNumber);
});
