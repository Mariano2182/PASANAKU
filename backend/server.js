const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/status', (req,res)=>{
  res.json({
    grupo:'Amigos 18',
    miembros:18,
    aporte:6000
  });
});

app.listen(3001, ()=>console.log('Backend ejecutándose en puerto 3001'));
