const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const DATA_FILE = path.join(__dirname, 'produkty.json');

app.get('/produkty/:rodzaj', (req, res) => {
  const rodzaj = req.params.rodzaj;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return res.status(500).send('Błąd odczytu pliku z produktami.');
  }

  if (data[rodzaj]) {
    return res.json({ rodzaj, produkty: data[rodzaj] });
  } else {
    return res.status(404).send('Nie znaleziono takiego rodzaju produktu.');
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Serwer produktów</h1><p>Użyj /produkty/owoce lub /produkty/warzywa</p>');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serwer 1 działa na http://localhost:${PORT}`));
