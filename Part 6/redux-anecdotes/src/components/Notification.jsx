// components/Notification.js
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification); // Leemos la notificación del store

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  // Si no hay notificación, no renderizamos el componente
  if (!notification) {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;