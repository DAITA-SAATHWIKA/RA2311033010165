const express = require('express');
const { Log } = require('../logging_middleware/logger');
const { initAuth } = require('./services/authService');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    // DO NOT use console.log anywhere
    await Log("backend", "info", "domain", `Server started on port ${PORT}`);
    
    // Initialize authentication on startup
    try {
        await initAuth();
        await Log("backend", "info", "domain", "Authentication initialized successfully");
    } catch (error) {
        await Log("backend", "error", "domain", "Failed to initialize authentication");
    }
});
