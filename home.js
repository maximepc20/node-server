const utils          = require('./utils');

var handling = (app) => {

    app.post('/', (req, res) => {
        var user = req.body.user;
        var code = 400;
        if(user === 'xam')
        {
            code = 200;
        }
        else {
            code = 202;
        }
        var result = { code: code }
        var resultString = JSON.stringify(result);
        res.send(resultString);

        utils.ecrireLog(`POST: ${user} : ${resultString}`);

    });

    app.get('/', (req, res) => {
        // res.send('<h1>Hello Express</h1>');
        res.render('home.hbs', {
            pageTitle : 'Bienvenue',
            pageMessage: 'Ce site est fait avec NODE.JS'
        });
    });


};

module.exports = {
    handling: handling
}
