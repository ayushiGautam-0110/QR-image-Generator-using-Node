const express = require('express');
const qrcode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/generate', async (req, res) => {
  const { url } = req.body;

  try {
    const qrCode = await qrcode.toDataURL(url);
    res.send({ qrCode });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate QR code' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
