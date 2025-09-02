const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const tendersRouter = require('./src/routes/tenders');
const productsRouter = require('./src/routes/products');
const ordersRouter = require('./src/routes/orders');
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tenders', tendersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));