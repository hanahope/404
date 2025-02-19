const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/send-data', async (req, res) => {
    const jsonBlobUrl = 'https://jsonblob.com/api/jsonBlob/1340397835622998016';
    const data = req.body;

    try {
        const response = await axios.get(jsonBlobUrl);
        let existingData = response.data;

        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        existingData.push(data);

        await axios.put(jsonBlobUrl, existingData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(200).send('Data sent successfully');
    } catch (error) {
        console.error('Error sending data to JSONBlob:', error);
        res.status(500).send('Error sending data');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});