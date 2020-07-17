const express = require('express')
var AWS = require('aws-sdk');
const dynamoose = require('dynamoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');

const app = express();

dynamoose.aws.sdk.config.update({
    //the keys go here
});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  


app.use(express.urlencoded({extended: false }))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const articles = await Article.scan().exec()
    res.render('articles/index', { articles:articles})
})

app.use('/articles', articleRouter)
app.listen(5000);