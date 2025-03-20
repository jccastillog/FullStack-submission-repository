// components/Notification.jsx
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null; // No mostrar nada si no hay notificación

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;