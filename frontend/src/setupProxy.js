const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: ['http://127.0.0.1:8000', 'http://127.0.0.1:8081'],
};

const app = express();
app.use(cors(corsOptions));
