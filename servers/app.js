const express = require('express');
const cors = require('cors');
const connectDatabae = require('./config/databases/connect');
// *link router
const productRouter = require('./routers/productRouter');
const app = express();
const port = 5000

app.use(cors())
// *connect router
app.use("", productRouter);


connectDatabae.connect();
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})