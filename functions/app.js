//app.js

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/", (req, res) => {
    res.send("App is running..");
});

app.use("/.netlify/functions/app", router);


const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post('/create-payment-intent', async (req, res) => {
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


module.exports.handler = serverless(app);