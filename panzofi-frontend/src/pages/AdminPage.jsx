import React, { useEffect, useState } from 'react';
import { getUserActivity, registerUserActivity } from '../services/api';
import { Table, Spin, Alert } from 'antd';
import dayjs from 'dayjs';
import { isAuthenticated } from '../services/auth';
import LogoutButton from '../components/logoutButton';

import UserActivityChart from '../components/Dashboard';  // Importamos el componente de gráfico

const AdminPage = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la actividad
  const fetchUserActivity = async () => {
    try {
      const data = await getUserActivity();  // Llamada a la API
      const authStatus = isAuthenticated();
      
      setUserActivity(data);  // Guardamos la respuesta en el estado
      setLoading(false);  // Actualizamos el estado de carga
      
      await registerUserActivity(authStatus.user_id);
    } catch (error) {
      setError(error.message);  // Si hay un error, lo mostramos
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivity();  // Ejecutamos la función cuando se monta el componente
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={`Error: ${error}`} type="error" />;

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'user_username',  // Usamos directamente 'user_username' ya que está en el objeto principal
      key: 'user_username',
    },
    {
      title: 'Fecha de Inicio',
      dataIndex: 'session_start',
      key: 'session_start',
      render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Duración de Sesión',
      dataIndex: 'session_duration',
      key: 'session_duration',
      render: (text) => `${text} segundos`,
    },
    {
      title: 'Botón 1 Clics',
      dataIndex: 'button_1_clicks',
      key: 'button_1_clicks',
    },
    {
      title: 'Botón 2 Clics',
      dataIndex: 'button_2_clicks',
      key: 'button_2_clicks',
    },
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Actividad de los Usuarios</h1>

      {/* Agregamos el componente del gráfico */}
      <UserActivityChart data={userActivity} />

      <Table
        dataSource={userActivity}
        columns={columns}
        rowKey={(record) => record.id || record.user_username}
        pagination={{ pageSize: 10 }}
      />
      
     
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
