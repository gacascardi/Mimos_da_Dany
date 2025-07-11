const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error fetching the URL');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});