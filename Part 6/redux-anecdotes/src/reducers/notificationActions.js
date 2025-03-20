// reducers/notificationActions.js
import { setNotification as setNotificationAction, clearNotification } from './notificationReducer';

export const setNotification = (message, timeoutInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotificationAction(message)); // Muestra la notificación

    // Limpia la notificación después del tiempo especificado
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeoutInSeconds * 1000); // Convierte segundos a milisegundos
  };
};