const express = require('express');
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/ruleRoutes');
const cors =require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE', allowedHeaders: 'Content-Type' }));
// Route setup
app.use(express.json());
app.use('/api/rules', ruleRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
