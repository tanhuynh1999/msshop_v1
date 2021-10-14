import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import {
    fileURLToPath
} from 'url';
// *link router
import siteRouter from './routers/siteRouter.js';
import productRouter from './routers/productRouter.js';


const app = express();
const port = 3000;

// *express-handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// *path
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));


// *connect router
app.use("", siteRouter);
app.use("", productRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})