const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let audioStatus = 'stop';
let audioUrl = '';
let volume = '100%';

app.post('/control', (req, res) => {
    const { action, value } = req.body;

    if (action === 'play' || action === 'pause' || action === 'stop') {
        audioStatus = action;
    } else if (action === 'volume') {
        const numericValue = parseInt(value);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            volume = numericValue + '%';
        }
    }

    res.json({ status: 'Button click received', action });
});

app.get('/audio-status', (req, res) => {
    res.json({ status: audioStatus, volume: volume });
});

app.post('/update-url', (req, res) => {
    const { url } = req.body;
    audioUrl = url;
    res.json({ status: 'URL updated' });
});

app.get('/current-url', (req, res) => {
    res.json({ url: audioUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
