// reducers/notificationReducer.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // El estado inicial es una cadena vacía
  reducers: {
    setNotification(state, action) {
      return action.payload; // Actualiza el estado con el mensaje de notificación
    },
    clearNotification(state) {
      return ''; // Limpia la notificación
    },
  },
});

// Exportamos las acciones generadas automáticamente
export const { setNotification, clearNotification } = notificationSlice.actions;

// Exportamos el reducer
export default notificationSlice.reducer;