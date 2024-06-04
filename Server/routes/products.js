const express = require('express');
const router = express.Router();

const products = [
    { id: 1, name: 'Celular', price: 199.99 },
    { id: 2, name: 'Portátil', price: 599.99 },
    { id: 2, name: 'Samsung A24', price: 663.000 },
];

router.get('/', (req, res) => {
    res.json(products);
});

module.exports = router;
