const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RegeXator',
            version: '1.0.0',
            description: "This is a simple API to parse a string by using regex"
        },
        servers : [
            {
                url : 'http://localhost:8080/'
            }
        ]
    },
    apis : ['./index.js']
}

const express = require('express');

const req = require('express/lib/request');
const res = require('express/lib/response');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
app.use(express.json())

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

/** 
 *  @swagger
 *  /test:
 *      get:
 *          summary: This api is used to test if get method is working
 *          description: This api is used to test if get method is working
 *          responses: 
 *              200: 
 *                  description: Test get method
*/

app.get('/test', (req,res) => {
    res.send('Welcome to RegeXator');
})

/**
 * @swagger
 *      components: 
 *          schemas:
 *              data:
 *                  type: object
 *                  properties: 
 *                      pattern:
 *                          type: string
 *                      target:
 *                          type: string
 */

/** 
 *  @swagger
 *  /regex:
 *      post:
 *          summary: This api is used to parse a string by using regex
 *          description: This api is used to parse a string by using regex
 *          requestBody: 
 *                  required: true
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/data'
 *                          example:          
 *                               # Properties of a referenced object
 *                               pattern: (?<=start).*(?=end)
 *                               target: start this is a test end
 *          responses: 
 *              200: 
 *                  description: Accepted
*/

app.post('/regex', (req,res) => {
    const pattern = req.body.pattern;
    const target = req.body.target;

    const regexp = new RegExp(pattern, "g");
    const resultArray = target.match(regexp);

    if (resultArray){
        // const resultTarget = resultArray.join('')
        // console.log(resultTarget)
        // res.send(resultTarget);
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