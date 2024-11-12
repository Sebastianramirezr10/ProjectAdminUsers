import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UserActivityChart = ({ data }) => {
  // Verifica si los datos existen y tienen elementos
  if (!data || data.length === 0) {
    return <div>No data available</div>; // Mensaje cuando no hay datos
  }

  // Preparamos los datos para el gráfico de barras
  const graphData = data.map((activity) => ({
    username: activity.user?.user_username || activity.user_username||'Usuario desconocido',  // Asegúrate de que `user` y `user_username` estén presentes
    button_1: activity.button_1_clicks || 0,  // Previene errores si el valor no existe
    button_2: activity.button_2_clicks || 0,
  }));

  // Preparamos los datos para el gráfico de pastel (total de clics por botón)
  const totalButton1Clicks = data.reduce((acc, activity) => acc + (activity.button_1_clicks || 0), 0);  // Verifica si `button_1_clicks` está definido
  const totalButton2Clicks = data.reduce((acc, activity) => acc + (activity.button_2_clicks || 0), 0);
  const pieData = [
    { name: 'Botón 1', value: totalButton1Clicks },
    { name: 'Botón 2', value: totalButton2Clicks },
  ];

  // Colores para el gráfico de pastel
  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div>
      {/* Gráfico de barras */}
      <ResponsiveContainer width="90%" height={270}>
        <BarChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="username" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="button_1" fill="#8884d8" name="Botón 1 Clics" />
          <Bar dataKey="button_2" fill="#82ca9d" name="Botón 2 Clics" />
        </BarChart>
      </ResponsiveContainer>

      {/* Gráfico de pastel */}
      <ResponsiveContainer width="90%" height={270}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
