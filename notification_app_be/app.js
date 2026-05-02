const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'notification_app_be' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    // Minimal backend placeholder. Kept silent to adhere to 'DO NOT use console.log anywhere'.
});
