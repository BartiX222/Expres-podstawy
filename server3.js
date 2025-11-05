const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const USERS_FILE = 'users.json';
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

function sprawdzHaslo(haslo) {
  return haslo.length >= 8 && 
         /[A-Z]/.test(haslo) && 
         /[0-9]/.test(haslo);
}

app.get('/rejestracja', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <title>Rejestracja</title>
    </head>
    <body>
      <h1>Rejestracja (tylko 18+)</h1>
      <form method="POST">
        <input name="imie" placeholder="Imię" required><br>
        <input name="wiek" type="number" placeholder="Wiek" required min="18"><br>
        <input name="haslo" type="password" placeholder="Hasło (8+, duża litera, cyfra)" required><br>
        <button>Wyślij</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/rejestracja', (req, res) => {
  const { imie, wiek, haslo } = req.body;

  if (!imie || !wiek || !haslo) {
    return res.send('Wypełnij wszystkie pola!');
  }

  if (wiek < 18) {
    return res.send('Tylko pełnoletni mogą się zarejestrować!');
  }

  if (!sprawdzHaslo(haslo)) {
    return res.send(`
      Hasło za słabe!<br>
      Wymagania: min. 8 znaków, duża litera, cyfra.
    `);
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  users.push({ imie, wiek: Number(wiek), zarejestrowany: new Date().toLocaleString() });
  
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.send(`
    <h2>Witaj ${imie}!</h2>
    <p>Zarejestrowano pomyślnie!</p>
    <a href="/rejestracja">← Wróć</a>
  `);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Serwer 3 działa na http://localhost:${PORT}`));