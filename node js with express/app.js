const express=require('express');

const app=express();

// Define your middleware functions
const firstMiddleware = (req, res, next) => {
    console.log('Inside first middleware function');
    next();
};

const secondMiddleware = (req, res, next) => {
    console.log('Inside second middleware function');
    res.send('<h1>Hello from express app');
};

// Use the middleware functions
app.use(firstMiddleware);
app.use(secondMiddleware);

app.listen(3000);