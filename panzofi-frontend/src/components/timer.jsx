import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', fontSize: '7px' }}>
      <h1>Tiempo en la página: {seconds} segundos</h1>
    </div>
  );
};

export default Timer;
