const express = require('express');
const cors = require('cors');
// *link router
const productRouter = require('./routers/productRouter');
const app = express();
const port = 5000

app.use(cors())
// *connect router
app.use("", productRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})