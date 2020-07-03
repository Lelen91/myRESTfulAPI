const express = require('express');
const logger = require('./middleware/logger')
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Init middleware
app.use(logger);

app.use('/api/couriers', require('./routes/api/couriers'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
