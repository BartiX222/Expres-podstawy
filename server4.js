const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const POSTS_FILE = path.join(__dirname, 'posts.json');

app.get('/post/:title', (req, res) => {
  const { title } = req.params;
  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  } catch (e) {
    return res.status(500).send('Błąd odczytu pliku z postami.');
  }

  const post = posts.find(p => p.title.toLowerCase() === title.toLowerCase());
  if (post) {
    res.send(`<h1>${post.title}</h1><p>${post.content}</p>`);
  } else {
    res.status(404).send('Nie znaleziono artykułu.');
  }
});

app.get('/', (req, res) => res.send('<h1>Prosty CMS</h1><p>Użyj /post/:title</p><br>Dostępne posty to: Node, Express.'));

const PORT = 3003;
app.listen(PORT, () => console.log(`Serwer 4 działa na http://localhost:${PORT}`));
