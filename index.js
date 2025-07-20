/*const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {

res.send('Hello, World! Welcome to Express.js server.');

});

app.listen(PORT, () => {

console.log(`Server is running on http://localhost:${PORT}`);

});
*/
/*

const express = require('express');

const app = express();

const PORT = 3000;



app.get('/', (req, res) => {

res.send('Welcome to the Home Page');

});



app.get('/contact', (req, res) => {

res.send('Contact us at contact@example.com');

});

*/


const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./db/database');
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT;


app.get('/', (req, res) => {

res.send('backend is running'); 
});

app.use("/api/test", require("./route/testroute"));
app.use("/api/products", require("./route/productroute"));







const startServer = async () => {
    await connectDB();
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

    });
};

startServer();





