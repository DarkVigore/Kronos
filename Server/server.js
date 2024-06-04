const express = require('express');
const path = require('path');
const Stripe = require('stripe');
const authRouter = require('./auth/auth');

const app = express();
const port = 3000;
const stripe = Stripe('tu_clave_secreta_de_stripe');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

app.post('/api/checkout', async (req, res) => {
    const { items } = req.body;

    const lineItems = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html',
        cancel_url: 'http://localhost:3000/cancel.html',
    });

    res.json({ id: session.id });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
