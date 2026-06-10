import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reemplaza con la URL de producción en el despliegue
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${API_URL}/api/status`)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
        setError('No se pudo conectar con el servidor.');
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return <div style={styles.container}><p>Cargando datos del MVP...</p></div>;
  if (error) return <div style={styles.container}><p style={{ color: 'red' }}>{error}</p></div>;

  // Cálculos financieros basados en el estado del Backend
  const fondoMensual = data.miembros * data.aporte;
  const fondoAguinaldo = fondoMensual * 0.1666; // Proporción estimada
  const pozoPrincipal = fondoMensual - fondoAguinaldo;

  return (
    <div style={styles.container}>
      <h1>Pasanaku MVP</h1>
      <h2>Grupo: {data.grupo}</h2>
      
      <div style={styles.card}>
        <p><strong>Miembros activos:</strong> {data.miembros}</p>
        <p><strong>Aporte mensual individual:</strong> ${data.aporte.toLocaleString()}</p>
      </div>

      <hr style={styles.divider} />

      <div style={styles.metrics}>
        <p><strong>Fondo Mensual Total:</strong> ${fondoMensual.toLocaleString()}</p>
        <p><strong>Pozo Principal:</strong> ${pozoPrincipal.toLocaleString()}</p>
        <p><strong>Fondo Aguinaldo (Reserva):</strong> ${fondoAguinaldo.toLocaleString()}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial, sans-serif', padding: '30px', maxWidth: '600px', margin: '0 auto' },
  card: { background: '#f4f4f4', padding: '15px', borderRadius: '8px', margin: '15px 0' },
  metrics: { fontSize: '1.1em', lineHeight: '1.6' },
  divider: { margin: '20px 0', border: '0', borderTop: '1px solid #ccc' }
};
