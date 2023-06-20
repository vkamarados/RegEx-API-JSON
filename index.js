const express = require('express');

const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();
app.use(express.json())


app.get('/test', (req,res) => {
    res.send('Welcome to RegexAPI');
})


app.post('/regex', (req,res) => {
    const pattern = req.body.pattern;
    const target = req.body.target;

    const regexp = new RegExp(pattern, "g");
    const resultArray = target.match(regexp);

    if (resultArray){
        res.send(resultArray);
    }else
    {
        res.send('Not found');
    }
})

//To check enviroment PORT is set
//const port = process.env.PORT || 8080;
const port = 8080;
app.listen(port, () => console.log(`listening to ${port}`))