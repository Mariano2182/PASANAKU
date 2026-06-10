const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint de prueba para el MVP
app.get('/api/status', (req, res) => {
  res.json({
    grupo: 'Amigos 18',
    miembros: 18,
    aporte: 6000
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
