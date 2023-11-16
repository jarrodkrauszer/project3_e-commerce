const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;
const is_prod = process.env.NODE.ENV === 'production'
const db = require('./config/connection');

const routes = require('./routes');

if (is_prod) {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  console.log('DB Connection Established!');

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});


