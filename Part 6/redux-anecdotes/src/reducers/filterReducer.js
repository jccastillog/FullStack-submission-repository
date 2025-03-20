import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter', // Nombre del slice
  initialState: '', // Estado inicial
  reducers: {
    setFilter(state, action) {
      return action.payload; // Actualiza el estado con el valor del filtro
    },
  },
});

// Exportamos la acción generada automáticamente
export const { setFilter } = filterSlice.actions;

// Exportamos el reducer
export default filterSlice.reducer;