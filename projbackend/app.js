require ('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const paymentBRoutes = require("./routes/paymentBRoutes")

const app = express()


// DB Connection
mongoose.connect(process.env.DATA, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("db connected")
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/" , authRoutes);
app.use("/" , userRoutes);
app.use("/", categoryRoutes);
app.use("/" , productRoutes);
app.use("/" , orderRoutes);
app.use("/" , paymentBRoutes);


// Ports
const port = process.env.PORT


app.listen(port , () => {
    console.log(`App is running at ${port}`)
})