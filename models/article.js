var AWS = require('aws-sdk');
const dynamoose = require('dynamoose');

//Create a date as DDMMYYYY to be easier to deal with
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


const article = new dynamoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        default: today
    }
})

module.exports = dynamoose.model('Article', article)