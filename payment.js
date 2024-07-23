const express = require('express');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
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


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port 3000`));