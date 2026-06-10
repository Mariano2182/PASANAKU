import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/status')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  if (loading) return <p>Cargando MVP...</p>;

  // Cálculos dinámicos basados en la respuesta del Backend
  const fondoMensual = data.miembros * data.aporte;
  const fondoAguinaldo = fondoMensual * 0.1666; // Ejemplo: 1/6 para aguinaldo
  const pozoPrincipal = fondoMensual - fondoAguinaldo;

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Pasanaku MVP</h1>
      <h2>Grupo: {data.grupo}</h2>
      <p>Miembros: {data.miembros} | Aporte: ${data.aporte}</p>
      <hr />
      <p>Fondo mensual: ${fondoMensual.toLocaleString()}</p>
      <p>Pozo principal: ${pozoPrincipal.toLocaleString()}</p>
      <p>Fondo aguinaldo: ${fondoAguinaldo.toLocaleString()}</p>
    </div>
  );
}
