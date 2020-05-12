const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requestes
app.use(cors());

// connect to mango db
// make sure to replace db string & creds with yours
// mongodb://mongodb0.example.com:27017/admin

mongoose.connect('mongodb+srv://sreekanth:test123@cluster0-synqk.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('db connected');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
})
