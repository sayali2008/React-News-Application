const express = require('express');
const http = require('http');
const app = express();

const guardianRoutes = require('./api/routes/guardianhome');
const nytimesRoutes = require('./api/routes/nytimeshome');

app.use('/guardian', guardianRoutes);

app.use('/nytimes', nytimesRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;