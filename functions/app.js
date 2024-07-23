//app.js

const express = require("express");
const serverless = require("serverless-http");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Adjust the origin as necessary
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", (req, res) => {
    res.send("App is running..");
});


router.post('/create-payment-intent', async (req, res) => {
    console.log("here in the post ");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);