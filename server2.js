const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('<h1>Witaj w Liście przepisów!</h1><p>Użyj /nazwaDania</p><br>Dostępne przepisy to: tost, zupa, frytki'));

const przepisy = {
  'tost': 'wzuć chleb z serem do opiekacza.',
  'zupa': 'kup se zupke chinską.',
  'frytki': 'Pokrój ziemniaki i wrzuć do oleju.'
};

app.get('/:nazwaDania', (req, res) => {
  const { nazwaDania } = req.params;
  const danie = przepisy[nazwaDania.toLowerCase()] || 'Brak szczegółowego przepisu do tego dania.';
  res.send(`<h2>Przepis na: ${nazwaDania}</h2><p>${danie}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Serwer 2 działa na http://localhost:${PORT}`));
