// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { loginUser, registerUserActivity } from '../services/api';
import { setToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [authenticated, setAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(null);

  useEffect(() => {
    // Verifica el estado de autenticación en el primer renderizado
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus.isAuthenticated);
    setIsStaff(authStatus.is_staff);
  }, []); // Se ejecuta solo al montar el componente

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      setLoading(true);
      const response = await loginUser(username, password);
      const { token } = response;
      setToken(token);  // Guardar el token en el localStorage

      // Obtener el estado de autenticación después de guardar el token
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus.isAuthenticated);
      setIsStaff(authStatus.is_staff);

      // Registrar la actividad del usuario después de login exitoso
      await registerUserActivity(authStatus.user_id);
        
      
      
      // Navegar dependiendo del rol del usuario
      if (authStatus.is_staff) {
        navigate('/admin'); // Navegar a la página de admin si es un staff
        message.success('Login successful!');
      } else {
        navigate('/landing'); // Navegar a la página de landing si es un usuario regular
        message.success('Login successful!');
      }

      
    } catch (error) {
      if (error.response && error.response.status === 400) {

        message.error('Usuario o contraseña incorrectos');
      }
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 250 }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
